import {Injectable} from '@angular/core';
import {BackandService} from '@backand/angular2-sdk';
import {Events} from 'ionic-angular';
//

/*
 Generated class for the WdAuthServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class BAServiceProvider {

  private _auth_status:string = null;
  private _isAuth:boolean = false;
  private _userInfo:any = null;
  //private _userTodo:any = null;

  private newUser() {

    this._userInfo = null;
    this._auth_status = null;
    this._isAuth = false;
    //this._userTodo = null;

  }

  /*get userTodo() {

    return this._userTodo;
  }

  set userTodo(todo) {

    this._userTodo = todo;
  }
*/
  get userName() {

    return this._userInfo ? this._userInfo.firstName : "";
  }

  get userStatus() {

    return this._auth_status;
  }

  get isAuth() {

    return this._isAuth;
  }

  get userId() {

    return this._userInfo ? this._userInfo.userId : "";
  }

  config = {
    appName: 'bentodo',
    signUpToken: '56d4ed97-0bf1-4402-9b18-7879424ea8df',
    anonymousToken: '568ffb31-4474-40a9-80e2-7e93f0e39f7e',
    runSocket: true,
    mobilePlatform: 'ionic'
  };

  constructor(private backand:BackandService,
              private events:Events) {
    //init wd
    backand.init(this.config);

    this.getUserDetails();

  }

  signUp(firstName:string, lastName:string, email:string, password:string, confirmPassword:string) {

    this.backand.signup(firstName, lastName, email, password, confirmPassword)
      .then((res:any) => {

          this.events.publish("bas:signUp-suc", res);
        },
        (err:any) => {

          this.events.publish("bas:signUp-err", err);
        }
      );


  }

  signIn(username:string, password:string) {

    this.backand.signin(username, password)
      .then((res:any) => {

          this._userInfo = res.data;
          this._auth_status = 'OK';
          this._isAuth = true;
          this.events.publish("bas:userLogin-suc", res);
        },
        (err:any) => {

          this.newUser();
          this.events.publish("bas:userLogin-err", err);
        }
      );

  }

  requestResetPassword(username:string) {

    this.backand.requestResetPassword(username)
      .then((res:any) => {

        this.events.publish("bas:resetPassword-suc", res);
      },
      (err:any) => {

        this.events.publish("bas:resetPassword-err", err);
      }
    );

  }

  postUserTodo(id:number, todoItems:string) {

    return this.backand.object.update("todos", id, {"todoItems": todoItems}, null);
  }

  getUserTodo() {

    return this.backand.object.getList("todos", {
      "pageSize": 2,
      "pageNumber": 1
      /*      "filter": [],
       "sort": [
       {
       "fieldName": "todoItems",
       "order": "asc"
       }
       ]*/
    });

  }

  createRecord(data: string) {

    return this.backand.object.create("todos", {todo:this.userId, todoItems:data});
  }

  //no access right
  getUsers() {

    this.backand.object.getList("users", {
      "pageSize": 20,
      "pageNumber": 1,
      "filter": [],
      "sort": []
    });
  }

  //one inner method and no promise method pub event inside
  getUserDetails() {

    this.backand.user.getUserDetails()
      .then(
        (res:any) => {
          if (res.data) {

            this._userInfo = res.data;
            this._auth_status = 'OK';
            this._isAuth = true;
            this.events.publish("bas:getUserDone");
          }
        },
        (err:any) => {

          this.newUser();
        }
      );

  }

  signOut() {

    this.backand.signout();
    this.newUser();
    this.events.publish("bas:userLogout");
  }

}
