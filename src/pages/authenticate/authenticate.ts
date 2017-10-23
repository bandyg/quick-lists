import {Component} from '@angular/core';
import {IonicPage, ViewController, Events} from 'ionic-angular';
import {UtilityProvider} from "../../providers/utility/utility";
import {BAServiceProvider} from "../../providers/auth-service/backand-service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FadeAnimation} from '../../animations/animation';
import {DataProvider} from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html',

  animations: [FadeAnimation]
})
export class AuthenticatePage {

  stateExpression:string;
  //
  //logInModel:{ email?:string, phone?:number, password?:string} = {};
  private logInForm:FormGroup;

  //
  private signUpForm:FormGroup;
  //signUpModel:{ firstName?:string, lastName?:string, email?:string, phone?:number, verificationCode?:number, password?:string, confirmPassword?:string} = {};

  //
  private forgetPasswordForm:FormGroup;
  forgetPasswordModel:{ email?:string, phone?:number, password?:string} = {};

  //
  currentModal:string = 'LogIn';

  //
  getVerificationCodeBtnText:string;
  getVerificationCodeBtnDisabled:boolean = false;

  //
  //WeChatPlugin: any;

  //
  //hasWeChatApp: boolean = false;
  auth_status:string;
  is_auth_error:boolean;
  loggedInUser:string;

  //
  // constructor
  constructor(public BAServ:BAServiceProvider,
              public viewCtrl:ViewController,
              private utilityComp:UtilityProvider,
              public dataService:DataProvider,
              public formBuilder:FormBuilder,
              private events:Events) {

    this.getVerificationCodeBtnText = ('Get Verification Code');

    this.logInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });

    this.signUpForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(10), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(10), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.forgetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      //phone: ['', Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*$')])],
      //password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.registerEventsHandler();

    if (this.BAServ.isAuth) {

      this.goUserPage();
    }

  }

  ionViewWillUnload() {
    console.log("view will unload");
    this.unregisterEventsHandler();
  }

//
// cancel modal
  cancelModal(param ?:string) {
    this.viewCtrl.dismiss(param);
  }


//
// login handler
  logInHandler(ngForm) {

    let formControls:any = this.logInForm.controls;

    let data = {
      email: formControls.email.value,
      password: formControls.password.value,
    };

    if (ngForm.valid) {
      this.utilityComp.presentLoading();
      this.BAServ.signIn(data.email, data.password);
      /*.then((res:any) => {
       this.utilityComp.dismissLoading();
       this.auth_status = 'OK';
       this.is_auth_error = false;
       this.loggedInUser = res.data.username;
       this.events.publish("auth:userLogin");
       //this.BAServ.setStatus("Authed");
       this.cancelModal();
       },
       (error:any) => {
       this.utilityComp.dismissLoading();
       let errorMessage:string = error.data.error_description;
       this.auth_status = `Error: ${errorMessage}`;
       this.is_auth_error = true;
       this.utilityComp.presentAlter({
       title: ('Alter'),
       subTitle: errorMessage,
       });

       }
       );*/
      /*         if (user.phoneVerified == false) {
       this.utilityComp.dismissLoading();
       let params = {
       title: "Notice",
       subTitle: "Please verify your account by email",
       buttons: [
       {
       text: 'Resend',
       role: 'cancel',
       handler: () => {
       console.log("Resend verification email");
       this.wdServ.sendEmailVerification();
       }
       },
       {
       text: 'Dismiss',
       }
       ]
       };
       this.utilityComp.presentCustomAlert(params);
       } else {
       //account login and access
       //let userCredential = wilddog.auth.WilddogAuthProvider.emailCredential(formControls.email.value, formControls.password.value);
       //this.data.setLoginFlag(userCredential);
       }
       console.log("login success, currentUser->");

       }).catch((err) => {
       this.utilityComp.dismissLoading();
       console.info('login failed ->', err);
       this.utilityComp.presentAlter({title: 'Login Failed', subTitle: err.message} );
       });*/
      /*      this.userService.logIn(data)
       .then(ret => {

       this.heyApp.authService.logIn(ret);
       this.viewCtrl.dismiss().then(() => {
       this.heyApp.utilityComp.dismissLoading();
       this.heyApp.utilityComp.presentToast(ret.nickname + ', ' + this.heyApp.translateService.instant('user.Welcome back'),);
       });
       }, (data) => {
       this.heyApp.utilityComp.dismissLoading();
       this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Log In Failed'), subTitle: data._body});
       });*/

    }
  }

//
// sign up handler
  signUpHandler(ngForm) {

    let formControls:any = this.signUpForm.controls;

    let data = {
      firstName: formControls.firstName.value,
      lastName: formControls.lastName.value,
      email: formControls.email.value,
      phone: formControls.phone.value,
      password: formControls.password.value,
      confirmPassword: formControls.confirmPassword.value
    };

    if (ngForm.valid) {

      this.utilityComp.presentLoading();
      this.BAServ.signUp(data.firstName, data.lastName, data.email, data.password, data.confirmPassword);


      /*      this.userService.signUp(data)
       .then(ret => {
       this.heyApp.authService.logIn(ret);
       this.viewCtrl.dismiss().then(() => {
       this.heyApp.utilityComp.dismissLoading();
       this.heyApp.utilityComp.presentToast(this.heyApp.translateService.instant('user.Sign Up Success, Welcome ') + ret.nickname);
       });
       }, (data) => {
       this.heyApp.utilityComp.dismissLoading().then(() => {
       let body = JSON.parse(data._body);
       this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Sign Up Failed'), subTitle: body[Object.keys(body)[0]]});
       });
       });*/
    }
  }


//
// get verification code
  getVerificationCode() {
    /*    this.userService.getVerificationCode({phone: this.signUpModel.phone}).then((res) => {
     this.getVerificationCodeBtnText = '60s';
     this.getVerificationCodeBtnDisabled = true;

     let verificationCodeInterval = setInterval(() => {
     let t = this.getVerificationCodeBtnText.substr(0, this.getVerificationCodeBtnText.indexOf('s'));

     if (parseInt(t) > 1) {
     this.getVerificationCodeBtnText = parseInt(t) - 1 + 's';
     } else {
     clearInterval(verificationCodeInterval);
     this.getVerificationCodeBtnDisabled = false;
     this.getVerificationCodeBtnText = this.heyApp.translateService.instant('user.Get Verification Code');
     }
     }, 1000);
     }, (res) => {
     this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('Alert'), subTitle: res._body});
     });*/
  }


//
//
// goto wechat oauth page
  gotoWeChatOAuthPage() {
    //location.assign('/api/wechat/o-auth');
  }


//
// login with wechat app
  loginWithWeChatApp() {
    this.utilityComp.presentLoading();

    /*    let scope = "snsapi_userinfo";
     let state = "_" + (+new Date());

     this.WeChatPlugin.auth(scope, state, (response) => {

     this.userService.logInWithWechat(response).then((ret) => {
     this.heyApp.authService.logIn(ret);

     this.viewCtrl.dismiss().then(() => {
     this.heyApp.utilityComp.dismissLoading();
     this.heyApp.utilityComp.presentToast(ret.nickname + ', ' + this.heyApp.translateService.instant('user.Welcome back'),);
     });
     }, (data) => {
     this.viewCtrl.dismiss().then(() => {
     this.heyApp.utilityComp.dismissLoading();
     this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Log In Failed'), subTitle: data._body});
     });
     });
     }, function (reason) {
     this.viewCtrl.dismiss().then(() => {
     this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('user.Log In Failed'), subTitle: reason});
     });
     });*/
  }

//
// open terms page
  openTermsPage() {
    /*    let url = (<any> window).API_DOMAIN + '/docs/terms.html';
     if (this.heyApp.platform.is('cordova')) {
     //let browser = new InAppBrowser(url, '_system');
     let browser = this.inAppBrowser.create(url, '_system');
     browser.show();
     } else {
     (<any> window).open(url, '_blank');
     }*/
  }

  forgetPasswordHandler(ngForm) {

    let formControls:any = this.forgetPasswordForm.controls;

    let data = {
      email: formControls.email.value
    };

    if (ngForm.valid) {

      this.utilityComp.presentLoading();
      this.BAServ.requestResetPassword(data.email);
      /*.then((res:any) => {
       this.utilityComp.dismissLoading();
       this.utilityComp.presentAlter({
       title: ('Alter'),
       subTitle: 'A reset password email sent, please check your email.',
       });
       //          this.email = this.signUpPassword = this.confirmPassword = this.firstName = this.lastName = '';
       },
       (err:any) => {

       this.utilityComp.presentAlter({
       title: ('Alter'),
       subTitle: err.data.error_description,
       });
       }
       );*/
    }
  }

  logoutHandler() {

    this.BAServ.signOut();
    this.events.publish("auth:userLogout");
    this.cancelModal();
  }

  goUserPage() {

    this.currentModal = "Authed";
  }

  upload2Cloud() {

    this.utilityComp.presentLoading();
    this.BAServ.getUserTodo()
      .then(data => {

        console.info("db data:", data);
        const userTodo = data.data[0];
        if (userTodo == null) {

          this.BAServ.createRecord("created")
            .then(res => {

              let itemId = res.data.__metadata.id;
              this.uploadData2Cloud(itemId);
              console.log(data);

            })
            .catch(err => {
              this.utilityComp.dismissLoading();
              console.log(err);
            });
        } else {
          //
          let itemId = userTodo.id;
          this.uploadData2Cloud(itemId);
          console.log(data);
        }
      })
      .catch(error => {
        this.utilityComp.dismissLoading();
        console.info("db error", error);
      });

  }


  download4Cloud() {

    this.utilityComp.presentLoading();
    this.BAServ.getUserTodo()
      .then(data => {

        console.info("db data:", data);
        const userTodo = data.data[0];
        this.dataService.saveFromJSON(userTodo.todoItems).then( () => {
          this.events.publish("auth:download-suc");
          this.utilityComp.dismissLoading();
          this.cancelModal();
        });

      })
      .catch(error => {
        this.utilityComp.dismissLoading();
        console.info("db error", error);
      });
  }

  registerEventsHandler() {
    //#1
    this.events.subscribe("bas:getUserDone", () => {
      console.log("bas:getUserDone event comes");
      this.events.publish("auth:getUserDone");
      this.goUserPage();
    });

    //#2
    this.events.subscribe("bas:userLogin-suc", (res) => {
      console.log("bas:userLogin-suc event comes");
      this.utilityComp.dismissLoading();
      this.events.publish("auth:userLogin");
      this.cancelModal();
    });

    //#3
    this.events.subscribe("bas:userLogin-err", (err) => {
      console.log("bas:userLogin-err event comes");
      this.utilityComp.dismissLoading();
      let errorMessage:string = err.data.error_description;
      this.auth_status = `Error: ${errorMessage}`;
      this.is_auth_error = true;
      this.utilityComp.presentAlter({
        title: ('Alter'),
        subTitle: errorMessage,
      });

    });

    //#4
    this.events.subscribe("bas:signUp-suc", (res) => {
      console.log("bas:signUp-suc event comes");
      this.utilityComp.dismissLoading();
      this.utilityComp.presentAlter({
        title: ('Alter'),
        subTitle: 'Sign up succeeded',
      });
      this.cancelModal();
    });

    //#5
    this.events.subscribe("bas:signUp-err", (err) => {
      console.log("bas:signUp-err event comes");
      this.utilityComp.dismissLoading();
      if (err.data.error == "invalid_grant") {
        err.data.error_description = "Please check the verification email."
      }

      this.utilityComp.presentCustomAlert({
        title: ('Alert'),
        subTitle: err.data.error_description,
        cusButtons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.cancelModal();
          }
        }]
      });

    });

    //#6
    this.events.subscribe("bas:resetPassword-suc", (res) => {
      console.log("bas:resetPassword-suc event comes");
      this.utilityComp.dismissLoading();
      this.utilityComp.presentAlter({
        title: ('Alter'),
        subTitle: 'A reset password email sent, please check your email.',
      });
    });

    //#7
    this.events.subscribe("bas:resetPassword-err", (err) => {
      console.log("bas:resetPassword-err event comes");
      this.utilityComp.dismissLoading();
      this.utilityComp.presentAlter({
        title: ('Alter'),
        subTitle: err.data,
      });
    });

    //#8
    this.events.subscribe("auth:uploadFinished", () => {
      console.log("auth:uploadFinished event comes");
      this.utilityComp.dismissLoading();
/*      this.utilityComp.presentAlter({
        title: ('Alter'),
        subTitle: "upload finished",
      });*/
    });

  }

  unregisterEventsHandler() {
    this.events.unsubscribe("bas:getUserDone");
    this.events.unsubscribe("bas:userLogin-suc");
    this.events.unsubscribe("bas:userLogin-err");
    this.events.unsubscribe("bas:signUp-suc");
    this.events.unsubscribe("bas:signUp-err");
    this.events.unsubscribe("bas:resetPassword-suc");
    this.events.unsubscribe("bas:resetPassword-err");
    this.events.unsubscribe("auth:uploadFinished");

  }

  uploadData2Cloud(itemId:number) {

    this.dataService.getData()
      .then(data => {

        this.BAServ.postUserTodo(itemId, data)
          .then(() => {
            this.events.publish("auth:uploadFinished");
            this.cancelModal();
          });
      });
  }
}
