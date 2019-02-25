import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  buttonText:string = 'play';
  reloaded:any;

  constructor(private data: DataService, private cookieService: CookieService) {
    this.data.currentlyPlaying.subscribe(isPlaying => {
      let currentState: any = this.data.getPlayState();
      if (currentState !== 'initial' && currentState !== 'end') {
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
    console.info('replaying? ', this.cookieService.get('replay'));
    if (this.cookieService.get("replay") == 'true' && performance.navigation.type == 1) {
      setTimeout(() => {
        this.data.changePlayState('intro');
        this.cookieService.set('replay', 'false');
      }, 500);
    }
  }

  play() {
    let currentState = this.data.getPlayState();
    if (currentState === 'initial') {
        this.data.changePlayState('intro');
    }
    else if (currentState === 'end') {
        this.cookieService.set('replay', 'true');
        location.reload(false);
    }
    else {
      this.data.changePlayState(currentState);
    }
  }

}
