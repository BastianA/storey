import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  // TODO: test browser compatibility and load corresponding
  // PATH: String = 'assets/cams/WebM_V9_720p_Medium';
  PATH: String = 'http://bastianandre.at/security/testvids_xs'
  EXT: String = 'webm';
  CODEC: String = 'vp8, opus'

  @Output() ready: EventEmitter<boolean> = new EventEmitter();
  @ViewChildren('player') playerRef;
  @ViewChildren('preview') previewRef;

  preloadReady: boolean = false;
  player;
  previews;
  cams = [
    {
      name: 'balkony',
      src: this.videoSrc('balkony')
    },
    {
      name: 'stairs',
      src: this.videoSrc('stairs')
    },
    {
      name: 'hallway',
      src: this.videoSrc('hallway')
    },
    {
      name: 'conference',
      src: this.videoSrc('conference')
    }
  ];
  currentCam = this.getCamByName('balkony');
  playState = {
    ready: false,
    playing: false,
    paused: true,
    aborted: false
  };
  camSwitcherVisible = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.preloadData();
  }

  ngAfterViewInit() {
    this.playerRef.changes.subscribe((ref) => {
      this.player = ref.first.nativeElement;
    });
    this.previewRef.changes.subscribe((ref) => {
      // this.previews = this.previewRef;
      this.previews = [];
      ref.toArray().forEach(ref => {
          this.previews.push(ref.nativeElement);
      });
  });
  }

  videoSrc(filename: string) {
    return `${this.PATH}/${filename}.${this.EXT}`;
  }

  getCamByName(name: string) {
    return this.cams.find(cam => cam.name === name);
  }

  setActiveCam(name: string) {
    if (this.player.currentSrc.includes(this.getCamByName(name).src)) {
      // do nothing
      alert('cam already playing, dude...');
    } else {
      this.currentCam = this.getCamByName(name);
      let marker = this.player.currentTime;
      this.player.load();
      if (this.playState.playing) {
        this.player.play();
      }
      this.player.currentTime = marker;
    }
  }

  togglePlayState() {
    if (this.player.paused || this.player.ended) {
      // play previews
      this.previews.forEach(preview => {
        preview.play();
      });
      // play main canvas
      this.player.play();
    } else {
      // pause previews
      this.previews.forEach(preview => {
        preview.pause();
      });
      // pause main canvas
      this.player.pause();
    }
    this.playState.playing = !this.playState.playing;
    this.playState.paused = !this.playState.paused;
  }

  toggleCamSwitcher() {
    this.camSwitcherVisible = !this.camSwitcherVisible;
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
