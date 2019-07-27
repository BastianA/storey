import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  constructor() { }

  formDataValid = false;



  ngOnInit() {
  }
  checkValid(){
   // console.log("Form has classes: " + document.getElementById('form').className);
    if(
      (document.getElementById('name').className.indexOf("ng-valid")) !==-1
      && (document.getElementById('mail').className.indexOf("ng-valid")) !==-1
      && (document.getElementById('subject').className.indexOf("ng-valid")) !==-1
      && (document.getElementById('message').className.indexOf("ng-valid")) !==-1
      )
      {
      this.formDataValid = true;
    }else this.formDataValid = false;

   // console.log("Form is valid: " + this.formDataValid);
  }


}