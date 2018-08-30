import { ContactComponent } from './staticpages/contact/contact.component';
import { AboutComponent } from './staticpages/about/about.component';
import { NewoppComponent } from './staticpages/newopp/newopp.component';
import { PortfolioComponent } from './staticpages/portfolio/portfolio.component';
import { ProfessionalComponent } from './staticpages/professional/professional.component';
import { WelcomeComponent } from './staticpages/welcome/welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { appRoutes } from './routes';
import { PostsComponent } from './staticpages/posts/posts.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavComponent } from './staticpages/nav/nav.component';

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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
