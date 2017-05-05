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

  roomsArr;

  constructor(public route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private userService: UserService) {
    this.rooms = db.list('/rooms');
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        console.log(params['id']);
        this.user = this.userService.getUser();
        this.rooms
          .subscribe(snapshots => {
            this.roomsArr = [];
            snapshots.forEach(snapshot => {
              // snapshot.users.forEach(user => {
              //   if (user.uid !== this.user.uid) {
              //
              //   }
              // });
            });
            console.log(snapshots)

          });
        // let messages = this.db.list('/rooms/default/messages');
        // messages.push({text: "dsfsdf"})
      });
  }

}
