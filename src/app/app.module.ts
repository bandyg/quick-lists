import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicStorageModule } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs';
import { BackandService } from '@backand/angular2-sdk';
import { BAServiceProvider } from '../providers/auth-service/backand-service';
import { UtilityProvider } from '../providers/utility/utility';
import {WdAuthServiceProvider} from "../providers/auth-service/auth-service";
import io from 'socket.io-client';
window["io"] = io;

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot( )
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
    BAServiceProvider,
    WdAuthServiceProvider
  ]
})
export class AppModule {}
