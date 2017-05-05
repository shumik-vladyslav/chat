import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  user;

  rooms;

  roomsArr;

  constructor(private db: AngularFireDatabase, private router: Router, private userService: UserService) {
    this.rooms = db.list('/rooms');
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.rooms
      .subscribe(snapshots => {
        this.roomsArr = [];
        snapshots.forEach(snapshot => {
          snapshot.users.forEach(user => {
            if (user.uid !== this.user.uid) {
              snapshot.show = true;
            }
          });
          console.log(snapshot)
          this.roomsArr.push(snapshot);
        });
      });
    // let messages = this.db.list('/rooms/default/messages');
    // messages.push({text: "dsfsdf"})
  }

}
