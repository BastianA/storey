import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../assets/fonts/material-icons/material-icons.css'
  ]
})
export class AppComponent {
  title = 'security';

  // site variables & paths
  securityLogo = 'assets/img/SecurityLogo_PlayPause.png';
}
