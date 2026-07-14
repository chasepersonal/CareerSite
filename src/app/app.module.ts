import { ContactComponent } from './staticpages/contact/contact.component';
import { AboutComponent } from './staticpages/about/about.component';
import { NewoppComponent } from './staticpages/newopp/newopp.component';
import { ProfessionalComponent } from './dynamicpages/professional/professional.component';
import { WelcomeComponent } from './staticpages/welcome/welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { appRoutes } from './routes';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavComponent } from './staticpages/nav/nav.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WelcomeComponent,
    ProfessionalComponent,
    NewoppComponent,
    ContactComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HttpClientJsonpModule,
    NgxPaginationModule,
    NgxPageScrollModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
