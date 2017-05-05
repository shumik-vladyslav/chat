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

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBXui6E9WHeIkYe-41Wm1sUFQksGUm-roI",
  authDomain: "chat-828b8.firebaseapp.com",
  databaseURL: "https://chat-828b8.firebaseio.com",
  projectId: "chat-828b8",
  storageBucket: "chat-828b8.appspot.com",
  messagingSenderId: "663248235118"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomsComponent,
    ChatComponent
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
