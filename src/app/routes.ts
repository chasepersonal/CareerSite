import { Routes } from '@angular/router';
import { WelcomeComponent } from './staticpages/welcome/welcome.component';
import { AboutComponent } from './staticpages/about/about.component';
import { PortfolioComponent } from './staticpages/portfolio/portfolio.component';
import { ProfessionalComponent } from './staticpages/professional/professional.component';
import { NewoppComponent } from './staticpages/newopp/newopp.component';
import { PostsComponent } from './staticpages/posts/posts.component';

export const appRoutes: Routes = [

  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'projects', component: PortfolioComponent },
  {path: 'professional', component: ProfessionalComponent },
  {path: 'newopp', component: NewoppComponent },
  {path: 'posts', component: PostsComponent },
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];
