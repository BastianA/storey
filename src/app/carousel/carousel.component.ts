import { Component, OnInit } from '@angular/core';
import Siema from 'siema';

@Component({
  // Instrucitons Carousel
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new Siema({
      selector: '.siema',
      onInit: () => {},
      onChange: () => {},
      startIndex: 0,
      draggable: true
    });
  }

}
