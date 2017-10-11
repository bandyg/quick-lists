import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {UtilityProvider} from "../../providers/utility/utility";
import {BAServiceProvider} from "../../providers/auth-service/backand-service";
import {Location}from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html'
})
export class AuthenticatePage {
  //
  logInModel:{ email?:string, phone?:number, password?:string} = {};

  //
  signUpModel:{ firstName?:string, lastName?:string, email?:string, phone?:number, verificationCode?:number, password?:string, confirmPassword?:string} = {};

  //
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
  auth_status: string;
  is_auth_error: boolean;
  loggedInUser: string;

  //
  // constructor
  constructor(//public heyApp: AppService,
    public BAServ:BAServiceProvider,
    public viewCtrl:ViewController,
    private utilityComp:UtilityProvider,
    private location: Location
    //private inAppBrowser: InAppBrowser
  ) {
    this.getVerificationCodeBtnText = ('Get Verification Code');
    this.BAServ.getUsers();
    this.BAServ.getUserDetails();
    this.BAServ.getItems();
    /*    if (this.heyApp.platform.is('cordova')) {
     this.WeChatPlugin = (<any> window).Wechat;
     this.WeChatPlugin.isInstalled(() => {
     this.hasWeChatApp = true;
     });
     }*/
  }


  //
  // cancel modal
  cancelModal() {
    this.viewCtrl.dismiss();
  }


  //
  // login handler
  logInHandler(ngForm) {

    let data = {
      email: this.logInModel.email,
      phone: this.logInModel.phone,
      password: this.logInModel.password,
    };

    if (ngForm.valid) {
      this.utilityComp.presentLoading();
      this.BAServ.signIn(data.email, data.password).then((res: any) => {
          this.auth_status = 'OK';
          this.is_auth_error = false;
          this.loggedInUser = res.data.username;
        },
        (error: any) => {
          let errorMessage: string = error.data.error_description;
          this.auth_status = `Error: ${errorMessage}`;
          this.is_auth_error = true;
          this.auth_status = 'ERROR';
        }
      );
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

    let data = {
      firstName: this.signUpModel.firstName,
      lastName: this.signUpModel.lastName,
      email: this.signUpModel.email,
      //phone: this.signUpModel.phone,
      //code: this.signUpModel.verificationCode,
      password: this.signUpModel.password,
      confirmPassword: this.signUpModel.confirmPassword
    };

    if (ngForm.valid) {

      this.utilityComp.presentLoading();
      this.BAServ.signUp(data.firstName, data.lastName, data.email, data.password, data.confirmPassword).then((res: any) => {

          this.utilityComp.presentAlter({
            title: ('Alter'),
            subTitle: 'Sign up succeeded',
          });
//          this.email = this.signUpPassword = this.confirmPassword = this.firstName = this.lastName = '';
        },
        (err: any) => {

          this.utilityComp.presentAlter({
            title: ('Alter'),
            subTitle: err.data,
          });
        }
      );
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

    let data = {
      email: this.forgetPasswordModel.email
    };

    if (ngForm.valid) {

      this.utilityComp.presentLoading();
      this.BAServ.requestResetPassword(data.email).then((res:any) => {

          this.utilityComp.presentAlter({
            title: ('Alter'),
            subTitle: 'A reset password email sent',
          });
//          this.email = this.signUpPassword = this.confirmPassword = this.firstName = this.lastName = '';
        },
        (err:any) => {

          this.utilityComp.presentAlter({
            title: ('Alter'),
            subTitle: err.data,
          });
        }
      );
    }
  }
}
