import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController, Platform, ModalController} from 'ionic-angular';
import { ChecklistModel } from '../../models/checklist-model';
import { DataProvider } from '../../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';
import { ItemSliding } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import {AuthenticatePage} from "../authenticate/authenticate";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];
  isCordovaPlatform:boolean = false;

  constructor(public navCtrl: NavController,
              public dataService:DataProvider,
              public alertCtrl: AlertController,
              public platform: Platform,
              public keyboard: Keyboard,
              public dialog: Dialogs,
              public modalCtrl: ModalController){
    //console.log( platform.platforms() );
    if (platform.is('core')) {
      this.isCordovaPlatform = true;
    }

  }

  ionViewDidLoad(){

    this.platform.ready().then( ()=> {

      this.dataService.getIntroFlag().then( result => {

        console.log( "The IntroFlag: " + result );
        if( !result ) {

          this.dataService.setIntroFlag( true );
          this.dataService.setSampleData();
          this.navCtrl.setRoot('IntroPage');
        }
      });

      this.dataService.getData().then( result => {

        let resultChecklists = null;

        if( typeof(result) != 'undefined' ) {

          resultChecklists = JSON.parse(result);

          console.log( resultChecklists );
        }

        if( resultChecklists != null ) {

          resultChecklists.forEach( checklist => {

            let loadChecklist = new ChecklistModel( checklist.title, checklist.items );
            loadChecklist.setDateTime( checklist.dateTime );
            loadChecklist.setProgress( checklist.progress );
            this.checklists.push(loadChecklist);

            loadChecklist.checklistUpdates().subscribe( update => this.save() )
          })
        }
      });

    });


  }

  addChecklist(): void {

    console.log("click add checklist!");

    if (this.isCordovaPlatform) {

      let alert = this.alertCtrl.create({
        title: 'New Checklist',
        message: 'Enter the new name of this checklist below:',
        inputs: [
          {
            name: 'listName',
            placeholder: 'List Name'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: (data) => {
              console.log( data.listName );
              let newChecklist = new ChecklistModel(data.listName, []);
              this.checklists.push(newChecklist);

              newChecklist.checklistUpdates().subscribe( update => {

                this.save();
              });

              this.save();
              console.log( this.checklists );
            }
          }
        ]
      });
      alert.present();

    } else {

      this.dialog.prompt('Enter the new name of this checklist below:', 'New Checklist', ["Save","Cancel"]).then( (params)=> {

        if( params.buttonIndex==1 && params.input1.length ) {
          let newChecklist = new ChecklistModel(params.input1, []);
          this.checklists.push(newChecklist);

          newChecklist.checklistUpdates().subscribe( update => {

            this.save();
          });
        }

      }).catch(e => console.log('Error displaying dialog', e));
    }

  }

  renameChecklist( checklist:ChecklistModel, slidingItem: ItemSliding ): void {

    if (this.isCordovaPlatform) {

      let alert = this.alertCtrl.create({
        title: 'Rename Checklist',
        message: 'Enter the new name of this checklist below:',
        inputs: [
          {
            name: 'listName',
            placeholder: 'New list name.'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

              console.log('Cancel clicked');
              slidingItem.close();
            }
          },
          {
            text: 'Save',
            handler: (data) => {

              if( data.listName.length ) {

                let index = this.checklists.indexOf(checklist);

                if (index > -1) {

                  this.checklists[index].setTitle(data.listName);
                  this.save();
                }

                slidingItem.close();
              }
            }
          }
        ]
      });
      alert.present();

    } else {

      this.dialog.prompt('Enter the new name of this checklist below:', 'Rename Checklist', ["Save","Cancel"]).then( (params)=> {

        if( params.buttonIndex==1 && params.input1.length ) {

          let index = this.checklists.indexOf(checklist);

          if (index > -1) {

            this.checklists[index].setTitle(params.input1);
            this.save();
          }

          slidingItem.close();

        }
      }).catch(e => console.log('Error displaying dialog', e));
    }


  }

  viewChecklist( checklist ): void {

    this.navCtrl.push( 'ChecklistPage',
      {
        'checklist': checklist
      }
    )
  }

  removeChecklist( checklist ): void {

    let index = this.checklists.indexOf(checklist);

    if( index > -1 ) {

      this.checklists.splice( index, 1 );
      this.save();
    }
  }

  save(): void {

    this.keyboard.close();
    this.dataService.save( this.checklists );

  }

  openUserPage(): void {

    let modal = this.modalCtrl.create('AuthenticatePage', { userId: 8675309 });
    modal.present();

  }

}
