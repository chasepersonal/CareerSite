import { Component, OnInit } from '@angular/core';
import { butterService } from '../../_services/butterCMS.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: any;

  // Variables for social link url strings
  linkedInUrl: string = 'https://www.linkedin.com/in/chase-weyer-4a5216a3/';
  githubUrl: string = 'https://github.com/chasepersonal';
  stackoverflowUrl: string = 'https://stackoverflow.com/users/8440440/chase';


  constructor(protected route: ActivatedRoute) { }

  ngOnInit() {
    this.getContact();
  }

  getContact(): any {
    return butterService.page.retrieve('contact', 'contact')
      .then((res) => {
        this.contact = res.data.data;
    });
  }
}
