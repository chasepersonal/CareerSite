import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  menuVisible = true;
  smallerWindow: boolean;

  ngOnInit() {
    this.onResize();
  }
  menuToggle() {
    this.menuVisible = !this.menuVisible;
  }

  checkWidth() {
    var width = window.innerWidth;
    if (width <= 992) {
      this.smallerWindow = true;
    } else {
      this.smallerWindow = false;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }
}
