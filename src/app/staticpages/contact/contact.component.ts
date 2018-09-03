import { Component, OnInit } from '@angular/core';
import { butterService } from '../../_services/butterCMS.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  /* Array needed to type match ButterCMS call */
  contact: any = {
    fields: []
  };

  // Variables for social link url strings
  linkedInUrl = 'https://www.linkedin.com/in/chase-weyer-4a5216a3/';
  githubUrl = 'https://github.com/chasepersonal';
  stackoverflowUrl = 'https://stackoverflow.com/users/8440440/chase';


  constructor(protected route: ActivatedRoute) { }

  ngOnInit() {
    this.getContact();
  }

  /* Retrieve page content from ButterCMS */
  getContact(): any {
    return butterService.page.retrieve('contact', 'contact')
      .then((res) => {
        this.contact = res.data.data;
    });
  }
}
