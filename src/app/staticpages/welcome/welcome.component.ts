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

  welcome: any = {
    fields: []
  };

  constructor(protected route: ActivatedRoute) { }

  ngOnInit() {
    this.getWelcome();
  }

  getWelcome(): any {
    return butterService.page.retrieve('*', 'welcome')
      .then((res) => {
        this.welcome = res.data.data;
    });
  }
}
