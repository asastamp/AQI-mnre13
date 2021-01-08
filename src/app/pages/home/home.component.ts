import { Component, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  type: string;

  constructor() {
    this.type = 'aqi';
  }

  onSelectedButton(event) {
    const id = event.target.id;
    if (!id || !id.startsWith('menu-')) {
      return;
    }
    const type = id.split('menu-')[1];
    this.type = type;

    this.toggleButton(event.target);
  }

  async takeScreenshot() {
    html2canvas(document.querySelector('#one-page')).then((canvas) => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      const dateTime = moment().format('วันที่ DD_MM_YY เวลา HH_mm_ss');
      a.download = `ข้อมูลคุณภาพอากาศ${dateTime}.png`;
      a.click();
    });
  }

  private toggleButton(target) {
    [].slice
      .call(target.parentElement.querySelectorAll('.btn'))
      .forEach((item) => {
        item.classList.remove('btn-selected');
      });
    target.classList.add('btn-selected');
  }
}
