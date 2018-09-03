import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {

  /* For accredation to CMS hosting site */
  butterCMSUrl: string = 'https://buttercms.com';

  constructor() {

  }

  ngOnInit() {

  }
}
