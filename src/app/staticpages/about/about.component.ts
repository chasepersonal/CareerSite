import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { butterService } from '../../_services/butterCMS.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  about: any;

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.getAbout();
  }

  getAbout(): any {
    return butterService.page.retrieve('static', 'about')
      .then((res) => {
        this.about = res.data.data;
      });
  }
}
