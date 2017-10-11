import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticatePage } from './authenticate';

@NgModule({
  declarations: [
    AuthenticatePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticatePage),
  ],
  exports: [
    AuthenticatePage
  ]
})
export class AuthenticatePageModule {}
