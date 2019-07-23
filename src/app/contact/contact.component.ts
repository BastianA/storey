import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    id: number;
    name: string;
    email: string;
    phone?: string;
    message: string;

  constructor() { }

  ngOnInit() {
  }

}
