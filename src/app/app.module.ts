import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { BlameComponent } from './blame/blame.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NavComponent,
    CarouselComponent,
    PlayButtonComponent,
    LightboxComponent,
    BlameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
