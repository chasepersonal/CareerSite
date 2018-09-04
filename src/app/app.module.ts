import { ContactComponent } from './staticpages/contact/contact.component';
import { AboutComponent } from './staticpages/about/about.component';
import { NewoppComponent } from './staticpages/newopp/newopp.component';
import { PortfolioComponent } from './staticpages/portfolio/portfolio.component';
import { ProfessionalComponent } from './dynamicpages/professional/professional.component';
import { WelcomeComponent } from './staticpages/welcome/welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { appRoutes } from './routes';
import { PostsComponent } from './dynamicpages/posts/posts.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavComponent } from './staticpages/nav/nav.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { PostsdetailsComponent } from './dynamicpages/postsdetails/postsdetails.component';

const customOptions: ShareButtonsOptions = {
  include: ['facebook','twitter','google','linkedin','pinterest','reddit','tumblr','whatsapp','messenger','telegram','sms'],
  exclude: []
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    WelcomeComponent,
    ProfessionalComponent,
    PostsComponent,
    PostsdetailsComponent,
    PortfolioComponent,
    NewoppComponent,
    ContactComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ShareButtonsModule.forRoot({options: customOptions}),
    HttpClientJsonpModule,
    NgxPaginationModule,
    NgxPageScrollModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
