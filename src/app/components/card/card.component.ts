import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() annonce: any;
  apiURL = 'localhost:8000/uploads/';

  constructor() { }

  ngOnInit(): void {
  }

}
