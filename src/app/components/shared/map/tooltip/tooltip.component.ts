import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less']
})
export class TooltipComponent implements OnInit {
  @Input() pin;
  constructor() { }

  ngOnInit(): void {
  }

}
