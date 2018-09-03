import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  /* Variables to check menu visibility and window size */
  menuVisible = true;
  smallerWindow: boolean;

  ngOnInit() {
    this.onResize();
  }

  /* Change boolean state of menu visibility for click action */
  menuToggle() {
    this.menuVisible = !this.menuVisible;
  }

  /* Check the width of the main browser window */
  /* If window is smaller than desktop, indicate that it is a smaller window */
  /* If not, indicate that it is a larger window */
  checkWidth() {
    var width = window.innerWidth;
    if (width <= 992) {
      this.smallerWindow = true;
    } else {
      this.smallerWindow = false;
    }
  }

  /* Listen to the window resize action in the browser */
  /* Upon resize, fire the checkWidth function */
  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }
}
