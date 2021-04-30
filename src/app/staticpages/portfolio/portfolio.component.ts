import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { butterService } from '../../services/butterCMS.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  /* Array needed to type match ButterCMS call */
  portfolio: any = {
    fields: []
  };

  /* Necessary for pagination */
  p: number = 1;

  /* Done as any array so that it can retrieve all of the project data from Butter */
  projects: any = {
    all: []
  };

  constructor(protected route: ActivatedRoute) {
  }

  /* Call both portfolio and project methods as content is in different areas of CMS */
  ngOnInit() {
    this.getPortfolio();
    this.getProjects();
  }

  /* Retrieve page content from ButterCMS */
  getPortfolio(): any {
    return butterService.page.retrieve('*', 'projects')
      .then((res) => {
        this.portfolio = res.data.data;
    });
  }

  /* Retrieve collection content from ButterCMS */
  getProjects(): any {
    return butterService.content.retrieve(['all_projects'])
      .then((res) => {

        /* Needs to specify all_projects collection in order to return necessary data */
        this.projects.all = res.data.data.all_projects;
    });
  }
}
