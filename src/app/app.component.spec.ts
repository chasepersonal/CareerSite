import { ContactComponent } from './staticpages/contact/contact.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './staticpages/nav/nav.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [
              AppComponent,
              ContactComponent,
              NavComponent
          ],
          imports: [
              HttpClientTestingModule,
              RouterTestingModule,
              ShareButtonsModule.forRoot(),
          ]
      }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
