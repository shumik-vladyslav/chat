export class Room {
  uid: any;
  displayName: any;
  email: any;

  constructor(data) {
    this.uid = data.uid;
    this.displayName = data.displayName;
    this.email = data.email;
  }
}
