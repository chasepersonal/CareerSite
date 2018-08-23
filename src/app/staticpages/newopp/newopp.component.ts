import { butterService } from '../../_services/butterCMS.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newopp',
  templateUrl: './newopp.component.html',
  styleUrls: ['./newopp.component.scss']
})
export class NewoppComponent implements OnInit {

  newopp: any;

  constructor(protected route: ActivatedRoute) {}
  ngOnInit() {
    this.getNewOpp();
  }

  getNewOpp(): any {
    return butterService.page.retrieve('*', 'opportunities-services')
      .then((res) => {
        this.newopp = res.data.data;
      });
  }

}
