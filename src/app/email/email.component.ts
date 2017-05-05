import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  user: any;

  users;

  rooms;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
    this.users = db.list('/users');
    this.rooms = db.list('/rooms');
  }


  onSubmit(formData) {
    if(formData.valid) {
      let email = formData.value.email;
      let password = formData.value.password
      this.afAuth.auth.signInWithEmailAndPassword( email , password).then(
        (success) => {
          console.log(success);
          this.router.navigate(['/rooms']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });

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
  }

  createNewUser(data) {
    this.users.push({
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
    });

    console.log("Пользователя создали");

    let room;
    this.rooms.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.name === "default") {
          room = snapshot;
        }
      });
    });

    setTimeout(() => {
      if (!room.users) {
        room.users = [];
      }
      room.users.push({
        uid: data.uid,
        displayName: data.displayName,
        email: data.email,
      });
      console.log("в руме лежит");
      console.log(room);
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
