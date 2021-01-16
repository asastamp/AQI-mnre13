import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.less']
})
export class PinComponent implements OnInit {
  @Input() pin;
  constructor() { }

  ngOnInit(): void {
  }

}
