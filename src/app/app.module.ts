import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
