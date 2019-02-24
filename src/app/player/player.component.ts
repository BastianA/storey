import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { DataService } from '../data.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  // TODO: test browser compatibility and load corresponding format
  // PATH: String = 'assets/cams/WebM_V9_720p_Medium'
  PATH: String = 'assets/cams/mp4'
  // EXT: String = 'webm';
  EXT: String = 'mp4';
  // CODEC: String = 'vp8, opus'
  CODEC: String = '';

  // @Input() playerPlayState: string;
  @Output() ready: EventEmitter<boolean> = new EventEmitter();
  @Output() sharePlayState = new EventEmitter();
  @ViewChildren('player') playerRef;
  @ViewChildren('preview') previewRef;

  // set true to shortcut videos
  // TODO: skipping in safari not working properly
  debug: boolean = true;

  preloadReady: boolean = false;
  player;
  playerRefReady;
  previews;
  cams = [
    {
      name: 'intro',
      src: this.videoSrc('intro')
    },
    {
      name: 'buero',
      src: this.videoSrc('buero')
    },
    {
      name: 'kueche',
      src: this.videoSrc('kueche')
    },
    {
      name: 'schlafzimmer',
      src: this.videoSrc('schlafzimmer')
    },
    {
      name: 'wohnzimmer',
      src: this.videoSrc('wohnzimmer')
    },
    {
      name: 'setup',
      src: this.videoSrc('setup')
    },
    {
      name: 'outro-laura',
      src: this.videoSrc('outro-laura')
    },
    {
      name: 'outro-paul',
      src: this.videoSrc('outro-paul')
    },
    {
      name: 'outro-barbara',
      src: this.videoSrc('outro-barbara')
    }
  ];
  currentCam = this.getCamByName('intro');
  switchables = [
    'buero',
    'kueche',
    'schlafzimmer',
    'wohnzimmer'
  ]
  @Input() playState = {
    playing: false,
    paused: true,
    finished: false,
    media: null
  };
  camSwitcherVisible = false;
  showControls = false;



  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    this.preloadData();
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  initPlayer() {
    this.awaitDomPlayer().then(player => {
      this.player = player;
    })
    this.grabPreviews();
  }

  awaitDomPlayer() {
    let playerRef = this.playerRef;
    let readyPlayer = new Promise(function(resolve, reject) {
      playerRef.changes.subscribe((ref) => {
        let player = ref.first.nativeElement;

        if (player) {
          resolve(player);
        }
        else {
          reject(Error("It broke"));
        }
      });
    })
    return readyPlayer;
  }

  grabPreviews() {
    this.previewRef.changes.subscribe((ref) => {
      this.previews = [];
      ref.toArray().forEach(ref => {
          this.previews.push(ref.nativeElement);
          this.previews = this.previews.filter(prev => this.switchables.includes(prev.id));
      });
      this.previews.forEach((preview) => {
        preview.muted = "muted";
      });
    });
  }

  videoSrc(filename: string) {
    return `${this.PATH}/${filename}.${this.EXT}`;
  }

  getCamByName(name: string) {
    return this.cams.find(cam => cam.name === name);
  }

  setActiveCam(name: string, toggle = true) {
    if (this.player.currentSrc.includes(this.getCamByName(name).src)) {
      // do nothing
    } else {
      this.currentCam = this.getCamByName(name);
      let marker = this.player.currentTime;
      this.player.load();
      if (this.playState.playing) {
        this.player.play();
      }
      this.player.currentTime = marker;
      this.previews.forEach(preview => {
        preview.currentTime = marker;
      });
    }
    if (toggle) {
      this.toggleCamSwitcher();
    }
  }

  togglePlayState() {
    let halted = this.player.paused || this.player.finished
    // refactor to simple if else or main and default
    switch (this.playState.media) {
      case 'intro': {
        if (halted) {
          if (this.debug) {
            this.player.currentTime = 278;
          }
          this.player.play();
          this.data.setPlay();
        } else {
          this.player.pause();
          this.data.setPause();
        }
        break;
      }
      case 'main': {
        if (halted) {
          if (this.debug) {
            // skipping for dev: remove
            this.player.currentTime = 716;
            this.previews.forEach((preview) => {
              preview.currentTime = 716;
            });
          }
          this.previews.forEach(preview => {
            preview.play();
          });
          this.player.play();
          this.data.setPlay();
        } else {
          this.previews.forEach(preview => {
            preview.pause();
          });
          this.player.pause();
          this.data.setPause();
        }
        break;
      }
      default: {
        if (halted) {
          this.player.play();
          this.data.setPlay();
        } else {
          this.player.pause();
          this.data.setPause();
        }
        break;
      }
    }

    this.playState.playing = !this.playState.playing;
    this.playState.paused = !this.playState.paused;
  }

  toggleCamSwitcher() {
    this.camSwitcherVisible = !this.camSwitcherVisible;
  }

  playIntro() {
    this.playState.media = 'intro';
    this.sharePlayState.emit(this.playState);
    this.currentCam = this.getCamByName('intro');

    if (!this.player) {
      this.awaitDomPlayer().then((player) => {
        this.togglePlayState();
      });
    }
    else {
      this.togglePlayState();
    }
  }

  playMain() {
    this.data.changePlayState('main');
    this.updateMedia();
    this.setActiveCam('wohnzimmer', false);

    this.player.currentTime = 0;
    this.previews.forEach((preview) => {
      preview.currentTime = 0;
    });
    this.playState.finished = false;
    this.sharePlayState.emit(this.playState);
    this.showControls = true;

    this.togglePlayState();
  }

  playSetup() {
    this.data.changePlayState('setup');
    this.updateMedia();
    this.setActiveCam('setup', false);
    this.player.currentTime = 0;
    this.playState.finished = false;
    this.sharePlayState.emit(this.playState);
    this.showControls = false;
    // skipping for dev: remove
    this.player.currentTime = 29;
    //
    this.togglePlayState();
  }

  playOutro() {
    let suspect = this.data.getCurrentSuspect();
    this.updateMedia(suspect.name);
    this.setActiveCam(this.playState.media.toLowerCase(), false);

    this.player.currentTime = 0;
    this.playState.finished = false;
    this.sharePlayState.emit(this.playState);
    this.togglePlayState();
  }

  updateMedia(suffix = false) {
    this.playState.media = this.data.getPlayState();
    if (suffix) {
      this.playState.media += `-${suffix}`;
    }
  }

  preloadData() {
    let batch = [];

    this.cams.forEach((cam) => {
      batch.push(this.http.get(cam.src, {responseType: 'blob'}));
    });

    Observable.forkJoin(batch).subscribe(
      (data) => {
        this.ready.emit(true);
        this.preloadReady = true;
      },
      err => console.error(err)
    );
  }

}
