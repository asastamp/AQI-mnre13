import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import Canvg from 'canvg';
import { AppService } from './app.service';
import { pins } from './app.metadata';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'aqi';
  pins: Array<any>;
  colors = {
    veryGood: '#3CCCFF',
    good: '#92D050',
    normal: '#FDFF00',
    bad: '#FFA200',
    veryBad: '#FF3C3A',
  };
  dateTime: string;
  aqiTube;
  pm25Tube;
  constructor(private service: AppService) {
    this.aqiTube = {
      header: 'ความหมายของสี AQI',
      veryGood: '0-25',
      good: '26-50',
      normal: '51-100',
      bad: '101-200',
      veryBad: '201 ขึ้นไป',
    };
    this.pm25Tube = {
      header: 'ความหมายของสี PM2.5 (µg/m³)',
      veryGood: '0-25',
      good: '26-37',
      normal: '38-50',
      bad: '51-90',
      veryBad: '90 ขึ้นไป',
    };
    moment.locale('th');
    this.dateTime = this.toBuddhistYear(
      moment(),
      'วันที่ D MMMM YYYY เวลา HH:00 น.'
    );
    this.service.retrieveData().subscribe((stations) => {
      this.pins = this.constructOutput(stations);
    });
  }

  toBuddhistYear(moment, format) {
    var christianYear = moment.format('YYYY');
    var buddhishYear = (parseInt(christianYear) + 543).toString();
    return moment
      .format(format.replace('YYYY', buddhishYear))
      .replace(christianYear, buddhishYear);
  }

  constructOutput(stations) {
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
        aqi: stations[index].LastUpdate.AQI.aqi,
        pm25: stations[index].LastUpdate.PM25.value,
        x: pin.x,
        y: pin.y,
        tooltipX: pin.tooltipX,
        tooltipY: pin.tooltipY,
        color: this.calcAQIvalue(+stations[index].LastUpdate.AQI.aqi),
        colorPM25: this.calcpm25value(+stations[index].LastUpdate.PM25.value),
        provinceColor: this.getProvinceColor(stations[index].areaTH),
        index: i + 1,
      };
      output.push(shownData);
    });
    return output;
  }

  onAQIChanged(event, i) {
    if (typeof +event.target.value === 'number') {
      this.updatePins(i, +event.target.value);
    }
  }

  updatePins(index: number, value: number) {
    this.pins[index].color = this.calcAQIvalue(value);
    this.pins[index].aqi = value;
  }

  calcAQIvalue(value) {
    if (value >= 0 && value < 26) {
      return this.colors.veryGood;
    } else if (value >= 26 && value < 51) {
      return this.colors.good;
    } else if (value >= 51 && value < 101) {
      return this.colors.normal;
    } else if (value >= 101 && value < 201) {
      return this.colors.bad;
    } else if (value >= 201) {
      return this.colors.veryBad;
    }
  }

  calcpm25value(value) {
    if (value >= 0 && value < 26) {
      return this.colors.veryGood;
    } else if (value >= 26 && value < 38) {
      return this.colors.good;
    } else if (value >= 38 && value < 51) {
      return this.colors.normal;
    } else if (value >= 51 && value <= 90) {
      return this.colors.bad;
    } else if (value > 90) {
      return this.colors.veryBad;
    }
  }

  getProvinceColor(value) {
    const [details, province] = value.split(',');
    const mapProvince = {
      ชลบุรี: '#FCE0B8',
      ฉะเชิงเทรา: '#FDFF73',
      ระยอง: '#DEFCD8',
      จันทบุรี: '#FDCAF3',
      สมุทรปราการ: '#B3EDFB',
      ตราด: '#B6C1FC',
    };
    return mapProvince[province.trim()];
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
