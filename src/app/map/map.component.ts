import { Component, Input } from '@angular/core';
import { zip } from 'rxjs';
import * as moment from 'moment';

import { AppService } from '../app.service';
import { config, colors, provinceColor } from '../app.metadata';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent {
  @Input() type;
  cache;
  pins: Array<any>;
  pinsPosition: Array<any>;
  stations;

  constructor(private service: AppService) {
    this.initData();
    zip(this.service.retrieveData(), this.service.getPins()).subscribe(
      ([stations, pin]: [any, any]) => {
        this.pinsPosition = pin;
        this.stations = stations;
        this.cache.aqi = this.constructOutput(stations, 'aqi');
        this.pins = this.constructOutput(stations, 'aqi');
      }
    );
  }

  ngOnChanges(changes) {
    if (changes.type) {
      const type = changes.type.currentValue;
      if (this.cache.hasOwnProperty(type)) {
        this.pins = this.cache[type];
        return;
      }
      this.pins = this.constructOutput(this.stations, type);
    }
  }

  initData() {
    this.cache = {};
  }

  constructOutput(stations, type: string) {
    if (!stations) {
      return;
    }
    const id = type.toUpperCase();
    const output = [];
    this.pinsPosition.forEach((pin, i) => {
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
        isValid: this.isValidValue(stations[index].LastUpdate),
        index: i + 1,
      };
      output.push(shownData);
    });
    return output;
  }

  isValidValue({ date, time }) {
    const dateTimeValue = moment(`${date} ${time}`);
    const diff = moment().diff(dateTimeValue, 'hours');
    return diff <= 1;
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
}
