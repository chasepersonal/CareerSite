import { butterService } from './../../_services/butterCMS.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  // Create variables to control viewing additional content
  // Multiple variables as there are multiple starting states
  showResume = true;
  showSkills = true;

  resume: any;

  constructor(protected route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getResume();
  }

  // When action is taken, will show or hide resume info
  resumeToggle() {
    this.showResume = !this.showResume;
  }

  skillsToggle() {
    this.showSkills = !this.showSkills;
  }

  getResume(): any {
    return butterService.page.retrieve('*', 'resume-and-skills')
      .then((res) => {
        this.resume = res.data.data;
      });
  }

}
