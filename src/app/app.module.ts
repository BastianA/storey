
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CookieService } from './cookie.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { LightboxComponent } from './lightbox/lightbox.component';
import { BlameComponent } from './blame/blame.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { BrowserNotSupportedComponent } from './browser-not-supported/browser-not-supported.component';

import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NavComponent,
    CarouselComponent,
    PlayButtonComponent,
    LightboxComponent,
    BlameComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BrowserNotSupportedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { 
        path: '', 
        component: HomeComponent
      },
      { 
        path: 'about', 
        component: AboutComponent
      },
      { 
        path: 'contact', 
        component: ContactComponent
      },
      { 
        path: '**', 
        component: HomeComponent
      },
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
