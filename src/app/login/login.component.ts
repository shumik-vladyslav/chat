import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {Router} from "@angular/router";
import { Cookie } from 'ng2-cookies';

import {User2} from "../shared/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;

  users;

  rooms;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
    this.users = db.list('/users');
    this.rooms = db.list('/rooms');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user.subscribe(data => {
      if (data && data.email) {
        this.users.subscribe(snapshots => {
          let flag;

          if (!snapshots.length) {
            this.rooms.update('default', {
              name: "default",
              users: []
            });
          }
          snapshots.forEach(snapshot => {
            if (snapshot.email === data.email){
              flag = true;
            }
          });

          if (!flag) {
            this.createNewUser(data);
          }

          this.router.navigate([ '/rooms' ]);

        });
      } else{
        console.log(2)
      }

    });
  }

  createNewUser(data) {
    let user2 = new User2(data);
    this.users.push(user2);

    let room;
    this.rooms.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
        if (snapshot.name === "Default") {
          room = snapshot;
        }
      });
    });

    setTimeout(() => {
      if (!room.users) {
        room.users = [];
      }
      room.users.push(user2);
      this.rooms.update('default', room);
    }, 5000);
  }

  logout() {
    this.afAuth.auth.signOut();
    Cookie.set("User", null);
  }

  ngOnInit() {
  }

}
