import { Routes } from '@angular/router';
import { WelcomeComponent } from './staticpages/welcome/welcome.component';
import { AboutComponent } from './staticpages/about/about.component';
import { ProfessionalComponent } from './dynamicpages/professional/professional.component';
import { NewoppComponent } from './staticpages/newopp/newopp.component';


export const appRoutes: Routes = [

  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'professional', component: ProfessionalComponent },
  {path: 'newopp', component: NewoppComponent },
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];
