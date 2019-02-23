import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  buttonText:string = 'play';

  constructor(private data: DataService) {
    this.data.currentlyPlaying.subscribe(isPlaying => {
      let currentState: any = this.data.getPlayState();
      if (currentState !== 'initial') {
        if (isPlaying) {
          this.buttonText = 'playing';
        }
        else {
          this.buttonText = 'resume ' + currentState;
        }
      }
      else if (currentState === 'end') {
        this.buttonText = 'replay';
      }
      else {
        this.buttonText = 'play';
      }
    })
  }

  ngOnInit() {
  }

  play() {
    let currentState = this.data.getPlayState();
    if (currentState === 'initial') {
        this.data.changePlayState('intro');
    }
    else {
      this.data.changePlayState(currentState);
    }
  }

}
