import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import {rootRouterConfig} from "./app.routes";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "./auth.service";
import { RoomsComponent } from './rooms/rooms.component';
import {UserService} from "./shared/user.service";
import { ChatComponent } from './chat/chat.component';

import {SignupComponent} from "./signup/signup.component";
import { EmailComponent } from "./email/email.component";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBubXkz2lF1u7f3a8WfVdEBF6hSJwlNO0M",
  authDomain: "my-chat-1f078.firebaseapp.com",
  databaseURL: "https://my-chat-1f078.firebaseio.com",
  projectId: "my-chat-1f078",
  storageBucket: "my-chat-1f078.appspot.com",
  messagingSenderId: "690995893085"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomsComponent,
    ChatComponent,
    SignupComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
