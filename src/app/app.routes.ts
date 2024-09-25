import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'profile/:id', component: ProfilePageComponent},
];
