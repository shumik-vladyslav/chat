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

  newRoom = "";

  constructor(private db: AngularFireDatabase, private router: Router, private userService: UserService) {
    this.rooms = db.list('/rooms');
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.rooms
      .subscribe(snapshots => {
        this.roomsArr = [];
        snapshots.forEach(snapshot => {
          console.log(snapshot.users)
          if(!snapshot.users.forEach){
            snapshot.users = this.objToArrys(snapshot.users);
          }
          snapshot.users.forEach(user => {
            if (user.email === this.user.email) {
              snapshot.show = true;
            }
          });
          this.roomsArr.push(snapshot);
        });
      });
  }

  objToArrys(obj){
    let res = [];
    for(let key in obj){
      res[key] = obj[key];
    }
    return res;
  }

  createRoom(){
    this.rooms.update(this.newRoom, {
      name: this.newRoom,
      users: [{
        uid: this.user.uid,
        displayName: this.user.displayName,
        email: this.user.email,
      }]
    });

    this.newRoom = "";
  }

  selectRoom(room) {
    this.router.navigate(['/chat', room.name]);
  }

}
