/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostsdetailsComponent } from './postsdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from 'node_modules/@angular/router/testing';

describe('PostsdetailsComponent', () => {
  let component: PostsdetailsComponent;
  let fixture: ComponentFixture<PostsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsdetailsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
