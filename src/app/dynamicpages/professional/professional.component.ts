import { butterService } from '../../services/butterCMS.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  /* Array needed to type match ButterCMS call */
  resume: any = {
    fields: []
  };

  jobs: any = {
    all: []
  };

  constructor(protected route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getTitleAndSkills();
    this.getJobs();
  }

  /* Retrieve page content from ButterCMS */
  getTitleAndSkills(): any {
    return butterService.page.retrieve('*', 'resume-and-skills')
      .then((res) => {
        this.resume = res.data.data;
      });
  }

  getJobs(): any {
    return butterService.content.retrieve(['all_jobs'])
      .then((res) => {

        /* Needs to specify all_projects collection in order to return necessary data */
        this.jobs.all = res.data.data.all_jobs;
    });
  }

}
