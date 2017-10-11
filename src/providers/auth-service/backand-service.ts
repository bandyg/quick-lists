import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
//

/*
 Generated class for the WdAuthServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class BAServiceProvider {

  config = {
    appName: 'bentodo',
    signUpToken: '56d4ed97-0bf1-4402-9b18-7879424ea8df',
    anonymousToken: '568ffb31-4474-40a9-80e2-7e93f0e39f7e',
    runSocket: true,
    mobilePlatform: 'ionic'
  };

  constructor( private backand: BackandService ) {
    //init wd
    backand.init(this.config);

  }

  signUp(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {

    return this.backand.signup(firstName, lastName, email, password, confirmPassword);

  }

  signIn (username: string, password: string) {

    return this.backand.signin(username, password);

  }

  requestResetPassword(username: string) {

    return this.backand.requestResetPassword(username);

  }

  postItem() {

 /*   let item = {
      name: this.name,
      description: this.description
    };

    if (item.name && item.description) {
      this.backand.object.create('todo', item)
        .then((res:any) => {
            // add to beginning of array
            this.items.unshift({id: null, name: this.name, description: this.description});
            this.name = '';
            this.description = '';
          },
          (err:any) => {
            alert(err.data);
          });
    }*/
  }

  getItems() {

    this.backand.object.getList("todos", {
      "pageSize": 20,
      "pageNumber": 1,
      "filter": [],
      "sort": [
        {
          "fieldName": "todoItems",
          "order": "asc"
        }
      ]
    })
      .then(data => { console.info("db data:", data); })
      .catch(error => { console.info("db error", error);})
  }

  getUsers() {
    this.backand.object.getList("users", {
      "pageSize": 20,
      "pageNumber": 1,
      "filter": [],
      "sort": []
    })
      .then(data => {
        console.log(data);
      })
      .catch(error => { })
  }

  getUserDetails() {
    this.backand.user.getUserDetails()
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
