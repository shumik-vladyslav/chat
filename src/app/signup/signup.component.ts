import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public afAuth: AngularFireAuth,private router: Router) {

  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      let email= formData.value.email;
      let password =  formData.value.password;
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (success) => {
          this.router.navigate(['/rooms'])
        }).catch(
        (err) => {
          this.error = err;
        })
    }
  }

  ngOnInit() {
  }

}
