import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  expanded = false;

  togExpand(){
    this.expanded = !this.expanded;
    console.log(this.expanded);
  }
}
