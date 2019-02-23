import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'blame',
  templateUrl: './blame.component.html',
  styleUrls: ['./blame.component.scss']
})
export class BlameComponent implements OnInit {

  suspects = [
    {
      name: 'Laura',
      guilty: true
    },
    {
      name: 'Paul',
      guilty: false
    },
    {
      name: 'Barbara',
      guilty: false
    },
    // {
    //   name: 'Oscar/Rainer',
    //   guilty: false
    // }
  ];

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  blame(suspect) {
    this.data.commitSuspect(suspect);
    this.data.changePlayState('outro');
  }

}
