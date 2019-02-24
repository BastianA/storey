import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'blame',
  templateUrl: './blame.component.html',
  styleUrls: ['./blame.component.scss']
})
export class BlameComponent implements OnInit {

  circleClip = this.sanitizer.bypassSecurityTrustStyle('circle(150px at center);');

  suspects = [
    {
      name: 'Laura',
      guilty: true,
      img: 'assets/img/suspects/laura_sq.jpg'
    },
    {
      name: 'Paul',
      guilty: false,
      img: 'assets/img/suspects/paul_sq.jpg'
    },
    {
      name: 'Barbara',
      guilty: false,
      img: 'assets/img/suspects/barbara_sq.jpg'
    }
  ];

  constructor(private data: DataService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  blame(suspect) {
    this.data.commitSuspect(suspect);
    this.data.changePlayState('outro');
  }

}
