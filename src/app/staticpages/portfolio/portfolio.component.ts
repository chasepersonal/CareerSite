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

  /* Necessary for pagination */
  p: number = 1;

  /* Done as any array so that it can retrieve all of the project data from Butter */
  projects: any = {
    all: []
  };

  constructor(protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPortfolio();
    this.getProjects();
  }

  getPortfolio(): any {
    return butterService.page.retrieve('*', 'projects')
      .then((res) => {
        this.portfolio = res.data.data;
    });
  }

  getProjects(): any {
    return butterService.content.retrieve(['all_projects'])
      .then((res) => {

        /* Needs to specify all_projects collection in order to return necessary data */
        this.projects.all = res.data.data.all_projects;
    });
}
