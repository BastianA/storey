import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { NgClass } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @ViewChild(PlayerComponent) player:any;

  isVisible: boolean = false;
  playerPlayState: any = {
    playing: false,
    paused: true,
    finished: false,
    media: null
  };
  firstPreparation = true;
  blameTime = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentPlayState.subscribe((state) => {
      console.warn(state);
      this.handlePlayState(state);
    });
    this.data.currentSuspect.subscribe((suspect) => {
      console.log(`user suspected ${suspect.name}`);
    });
  }

  toggleLightbox() {
    // pause player if playing
    if (this.isVisible && this.playerPlayState.playing && !this.playerPlayState.finished && !this.data.getPlayState().startsWith('outro-')) {
      this.player.togglePlayState();
    }
    this.isVisible = !this.isVisible;
  }

  getPlayerPlayState($event) {
    // get playState from player
    this.playerPlayState = $event;
  }

  // is triggered on changePlayState
  handlePlayState(state) {
    switch(state) {
      case 'initial': {

        break;
      }
      case 'intro': {
        // show lightbox
        this.toggleLightbox();
        this.player.playIntro();
        if (this.firstPreparation) {
          this.prepareMain();
          this.firstPreparation = false;
        }
        break;
      }
      case 'main': {
        if(!this.isVisible) {
          this.toggleLightbox();
          //this.player.togglePlayState();
        }
        break;
      }
      case 'setup': {
        if(!this.isVisible) {
          this.toggleLightbox();
          this.player.togglePlayState();
        }
        break;
      }
      case 'outro': {
        if(!this.isVisible) {
          this.toggleLightbox();
          this.player.togglePlayState();
        }
        this.blameTime = false;
        if (this.playerPlayState.finished) {
            this.player.playOutro();
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  finishSequence(current) {
    current.playerPlayState.playing = false;
    current.playerPlayState.paused = true;
    current.playerPlayState.finished = true;
  }

  prepareMain() {
    this.player.awaitDomPlayer().then((player) => {
      player.addEventListener('ended', () => {
        if (this.data.getPlayState() === 'intro') {
          this.finishSequence(this);
          this.player.playMain();
        } else if (this.data.getPlayState() === 'main') {
          if (this.player.switchables.includes(this.player.currentCam.name) && !this.playerPlayState.finished) {
            this.finishSequence(this);
            this.player.playSetup();
          }
          //this.finishSequence(this);
        } else if (this.data.getPlayState() === 'setup') {
          this.blameTime = true;
          this.finishSequence(this);
          console.log('setup finished. now decide...');
        }
      });
    });
  }

}
