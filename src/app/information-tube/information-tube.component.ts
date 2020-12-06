import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-information-tube',
  templateUrl: './information-tube.component.html',
  styleUrls: ['./information-tube.component.less'],
})
export class InformationTubeComponent implements OnInit {
  @Input() tube;
  constructor() {}

  ngOnInit(): void {}
}
