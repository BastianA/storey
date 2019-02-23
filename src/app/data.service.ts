import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private playState = new BehaviorSubject<string>('initial');
  currentPlayState = this.playState.asObservable();

  private isPlaying = new BehaviorSubject<boolean>(false);
  currentlyPlaying = this.isPlaying.asObservable();

  private blamedSuspect = new BehaviorSubject<any>({});
  currentSuspect = this.blamedSuspect.asObservable();

  constructor() { }

  playing() {
    return this.isPlaying.value;
  }

  setPlay() {
    console.log('play');
    this.isPlaying.next(true);
  }

  setPause() {
    console.log('paused');
    this.isPlaying.next(false);
  }

  getPlayState() {
    return this.playState.value;
  }

  changePlayState(state: string) {
    this.playState.next(state);
  }

  commitSuspect(suspect) {
    this.blamedSuspect.next(suspect);
  }

  getCurrentSuspect() {
    return this.blamedSuspect.value;
  }
}
