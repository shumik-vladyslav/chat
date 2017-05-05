import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public afAuth: AngularFireAuth,private router: Router) {

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
    }
  }

  ngOnInit() {
  }

}
