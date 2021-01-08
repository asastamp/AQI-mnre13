import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { config } from '../app.metadata';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentComponent {
  @Input() type: string;

  header: string;
  tubeData;
  pins: Array<any>;
  dateTime: string;

  constructor() {
    this.setDateTime();
  }

  ngOnChanges(changes) {
    if (changes.type) {
      const type = changes.type.currentValue;
      this.header = config.header[type];
      this.tubeData = config.tube[type];
    }
  }

  private setDateTime(): void {
    moment.locale('th');
    this.dateTime = this.toBuddhistYear(
      moment(),
      'วันที่ D MMMM YYYY เวลา HH:00 น.'
    );
  }

  private toBuddhistYear(moment, format) {
    var christianYear = moment.format('YYYY');
    var buddhishYear = (parseInt(christianYear) + 543).toString();
    return moment
      .format(format.replace('YYYY', buddhishYear))
      .replace(christianYear, buddhishYear);
  }
}
