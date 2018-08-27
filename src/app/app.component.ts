import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showDropDown = true;

  constructor() {

  }

  ngOnInit() {

  }

  dropDownToggle() {
    this.showDropDown = !this.showDropDown;
  }
}
