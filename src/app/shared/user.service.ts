import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class UserService {
  userAf: Observable<firebase.User>;
  user;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.userAf = this.afAuth.authState;

    this.userAf.subscribe(data => {
      this.user = data;
      if(this.user && this.user.email)
      Cookie.set("User", JSON.stringify({
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email,
      }));
    });
  }

  public getUser(){
    return JSON.parse(Cookie.getAll()['User']);
  }
}
