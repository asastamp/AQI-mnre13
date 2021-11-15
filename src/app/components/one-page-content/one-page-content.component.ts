import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { Config } from '../../app.metadata';

@Component({
  selector: 'app-one-page-content',
  templateUrl: './one-page-content.component.html',
  styleUrls: ['./one-page-content.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class OnePageContentComponent {
  @Input() type: string;

  header: string;
  tubeData;
  days: number;
  pins: Array<any>;
  date: string;
  time: string;
  daysColor = [
    {
      day: 'อาทิตย์',
      selector: 'sun',
    },
    {
      day: 'จันทร์',
      selector: 'mon',
    },
    {
      day: 'อังคาร',
      selector: 'tue',
    },
    {
      day: 'พุธ',
      selector: 'wed',
    },
    {
      day: 'พฤหัสบดี',
      selector: 'thu',
    },
    {
      day: 'ศุกร์',
      selector: 'fri',
    },
    {
      day: 'เสาร์',
      selector: 'sat',
    },
  ];

  constructor() {
    this.setDateTime();
  }

  ngOnChanges(changes) {
    if (changes.type) {
      const type = changes.type.currentValue;
      this.header =
        type === 'aqi' ? `${Config.header[type]}` : ` ${Config.header[type]}`;
      this.tubeData = Config.tube[type];
    }
  }

  private setDateTime(): void {
    moment.locale('th');
    this.date = this.toBuddhistYear(moment(), 'D MMMM YYYY');
    this.time = this.toBuddhistYear(moment(), 'HH:00 น.');
    this.days = moment().day();
  }

  private toBuddhistYear(moment, format) {
    var christianYear = moment.format('YYYY');
    var buddhishYear = (parseInt(christianYear) + 543).toString();
    return moment
      .format(format.replace('YYYY', buddhishYear))
      .replace(christianYear, buddhishYear);
  }
}
