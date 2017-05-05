import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.service";
import {RoomsComponent} from "./rooms/rooms.component";
import {ChatComponent} from "./chat/chat.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
];
