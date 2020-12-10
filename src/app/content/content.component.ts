import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
})
export class ContentComponent {
  @Input() header: string;
  @Input() tubeData;
  @Input() pins: Array<any>;
  dateTime: string;

  constructor() {
    this.setDateTime();
  }

  setDateTime(): void {
    moment.locale('th');
    this.dateTime = this.toBuddhistYear(
      moment(),
      'วันที่ D MMMM YYYY เวลา HH:00 น.'
    );
  }

  toBuddhistYear(moment, format) {
    var christianYear = moment.format('YYYY');
    var buddhishYear = (parseInt(christianYear) + 543).toString();
    return moment
      .format(format.replace('YYYY', buddhishYear))
      .replace(christianYear, buddhishYear);
  }
}
