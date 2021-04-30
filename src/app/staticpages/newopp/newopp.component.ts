import { butterService } from '../../services/butterCMS.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newopp',
  templateUrl: './newopp.component.html',
  styleUrls: ['./newopp.component.scss']
})
export class NewoppComponent implements OnInit {

  /* Array needed to type match ButterCMS call */
  newopp: any = {
    fields: []
  };

  constructor(protected route: ActivatedRoute) {}
  ngOnInit() {
    this.getNewOpp();
  }

  /* Retrieve page content from ButterCMS */
  getNewOpp(): any {
    return butterService.page.retrieve('*', 'career-aspirations')
      .then((res) => {
        this.newopp = res.data.data;
      });
  }

}
