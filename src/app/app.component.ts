import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import * as moment from 'moment';

import { AppService } from './app.service';
import { pins, config, colors, provinceColor } from './app.metadata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  header: string;
  tubeData;
  cache;
  pins: Array<any>;

  stations;

  constructor(private service: AppService) {
    this.initData();
    this.service.retrieveData().subscribe((stations) => {
      this.stations = stations;
      this.cache.aqi = this.constructOutput(stations, 'aqi');
      this.pins = this.constructOutput(stations, 'aqi');
    });
  }

  initData() {
    this.header = config.header.aqi;
    this.tubeData = config.tube.aqi;
    this.cache = {};
  }
  onSelectedButton(event) {
    const id = event.target.id;
    if (!id || !id.startsWith('menu-')) {
      return;
    }
    const type = id.split('menu-')[1];
    this.header = config.header[type];
    this.tubeData = config.tube[type];
    this.toggleButton(event.target);
    if (this.cache.hasOwnProperty(type)) {
      this.pins = this.cache[type];
      return;
    }
    this.pins = this.constructOutput(this.stations, type);
  }

  toggleButton(target) {
    [].slice
      .call(target.parentElement.querySelectorAll('.btn'))
      .forEach((item) => {
        item.classList.remove('btn-selected');
      });
    target.classList.add('btn-selected');
  }

  constructOutput(stations, type: string) {
    if (!stations) {
      return;
    }
    const id = type.toUpperCase();
    const output = [];
    pins.forEach((pin, i) => {
      const index = stations.findIndex(
        (station) => station.stationID === pin.stationId
      );
      if (index === -1) {
        return;
      }
      const shownData = {
        location: stations[index].areaTH.split(',')[0],
        value: stations[index].LastUpdate[id][config.path[type]],
        x: pin.x,
        y: pin.y,
        tooltipX: pin.tooltipX,
        tooltipY: pin.tooltipY,
        province: pin.province,
        color: this[`calc${id}value`](
          +stations[index].LastUpdate[id][config.path[type]]
        ),
        provinceColor: this.getProvinceColor(stations[index].areaTH),
        index: i + 1,
      };
      output.push(shownData);
    });
    return output;
  }

  calcAQIvalue(value) {
    if (value >= 0 && value < 26) {
      return colors.veryGood;
    } else if (value >= 26 && value < 51) {
      return colors.good;
    } else if (value >= 51 && value < 101) {
      return colors.normal;
    } else if (value >= 101 && value < 201) {
      return colors.bad;
    } else if (value >= 201) {
      return colors.veryBad;
    }
  }

  calcPM25value(value) {
    if (value >= 0 && value < 26) {
      return colors.veryGood;
    } else if (value >= 26 && value < 38) {
      return colors.good;
    } else if (value >= 38 && value < 51) {
      return colors.normal;
    } else if (value >= 51 && value <= 90) {
      return colors.bad;
    } else if (value > 90) {
      return colors.veryBad;
    }
  }

  getProvinceColor(value) {
    const [details, province] = value.split(',');
    return provinceColor[province.trim()];
  }

  updatePins(index: number, value: number) {
    this.pins[index].color = this.calcAQIvalue(value);
    this.pins[index].aqi = value;
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
}
