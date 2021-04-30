import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { butterService } from '../../services/butterCMS.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /* Array needed to type match ButterCMS call */
  about: any = {
    fields: []
  };

  constructor(protected route: ActivatedRoute) {}

  ngOnInit() {
    this.getAbout();
  }

  /* Retrieve page content from ButterCMS */
  getAbout(): any {
    return butterService.page.retrieve('static', 'about')
      .then((res) => {
        this.about = res.data.data;
      });
  }
}
