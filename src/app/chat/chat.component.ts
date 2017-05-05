import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user;

  rooms;

  messages;

  mess = "";

  users;

  id = "";

  constructor(public route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private userService: UserService) {
    this.rooms = db.list('/rooms');
    this.users = db.list('/users');

  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        console.log(params['id']);
        this.user = this.userService.getUser();
        this.rooms
          .subscribe(snapshots => {
            let auth = false;
            this.id = params["id"];
            snapshots.forEach(snapshot => {
              if (snapshot.name === params['id']) {
                if(!snapshot.users.forEach){
                  snapshot.users = this.objToArrys(snapshot.users);
                }
                snapshot.users.forEach(user => {
                  if (user.email === this.user.email) {
                    auth = true;
                    this.messages = this.db.list('/rooms/' + params['id'] + "/messages");
                  }
                });
              };
            });
            if (!auth)
              this.router.navigate([ '/rooms' ]);

          });
      });
  }

  sendMessage(){
    this.messages.push({text: this.mess, author: this.user.displayName, time: new Date().toString()});

    this.mess = "";
  }

  nameInvite = "";

  inviteTo(){
    let users = this.db.list('/rooms/' + this.id+ "/users")
      .update("5",{email: this.nameInvite, displayName: "23", uid: "23"});

    this.nameInvite = "";
  }

  objToArrys(obj){
    let res = [];
    for(let key in obj){
      res[key] = obj[key];
    }
    return res;
  }

}
