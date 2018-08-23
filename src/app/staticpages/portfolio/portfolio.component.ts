import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { butterService } from '../../_services/butterCMS.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolio: any;

  constructor(protected route: ActivatedRoute) {
    this.getPortfolio();
  }

  ngOnInit() {
  }

  getPortfolio(): any {
    return butterService.page.retrieve('*', 'projects')
      .then((res) => {
        this.portfolio = res.data.data;
    });
  }
}
