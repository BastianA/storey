import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  teamPic = 'assets/img/team.jpg'
  labsterLogo = 'assets/img/LabsterLogo.png';

  constructor() { }

  ngOnInit() {
  }

}
