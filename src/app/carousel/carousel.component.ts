import { Component, OnInit } from '@angular/core';
import Siema from 'siema';

@Component({
  // Instrucitons Carousel
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() {
    Siema.prototype.useArrows = function() {
      document.querySelector('.siema-previous').addEventListener('click', () => this.prev());
      document.querySelector('.siema-next').addEventListener('click', () => this.next());
    }
  }

  ngOnInit() {
    new Siema({
      selector: '.siema',
      onInit: () => {},
      onChange: () => {},
      startIndex: 0,
      draggable: true
    }).useArrows();
  }

}
