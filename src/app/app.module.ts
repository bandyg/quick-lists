import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {DataProvider} from '../providers/data/data';
import {Keyboard} from '@ionic-native/keyboard';
import {IonicStorageModule} from '@ionic/storage';
import {Dialogs} from '@ionic-native/dialogs';
import {BackandService} from '@backand/angular2-sdk';
import {BAServiceProvider} from '../providers/auth-service/backand-service';
import {UtilityProvider} from '../providers/utility/utility';
import io from 'socket.io-client';
window["io"] = io;

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Keyboard,
    Dialogs,
    BackandService,
    UtilityProvider,
    BAServiceProvider
  ]
})
export class AppModule {
}
