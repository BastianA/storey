import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public supported;

  CheckSupported(){

    var supportedBrowsers = ["Chrome","Firefox","Edge"];
    var userAgent = navigator.userAgent;
    console.log(userAgent);

    for( var i = 0; i < supportedBrowsers.length; i++) {
      console.log(i);
      if(userAgent.indexOf(supportedBrowsers[i]) > -1 ){
        this.supported = true;
        console.log("A supported Browser was found");
        break;

      } else {this.supported = false;}
    }
  }

  constructor() { }

  ngOnInit() {
    this.CheckSupported();
  }

}
