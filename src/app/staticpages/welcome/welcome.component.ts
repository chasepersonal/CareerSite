import { butterService } from './../../_services/butterCMS.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  welcome: any;

  constructor(protected route: ActivatedRoute) { }

  ngOnInit() {
    this.getWelcome();
  }

  getWelcome() {
    return butterService.page.retrieve('*', 'welcome')
      .then((res) => {
        this.welcome = res.data.data;
      });
  }
}
