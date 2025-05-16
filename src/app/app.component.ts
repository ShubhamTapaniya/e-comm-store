import { Component } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private router: Router) {//when route changes redirect to top of that page
    this.router.events
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
