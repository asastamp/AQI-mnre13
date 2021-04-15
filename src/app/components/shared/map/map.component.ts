import { Component, Input } from '@angular/core';
import { zip } from 'rxjs';
import * as moment from 'moment';

import { AppService } from '../../../app.service';
import { Config, DisplayData, PinColor, PinPosition, ProvinceColor, Station } from '../../../app.metadata';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent {
  @Input() type: string;
  @Input() isEditMode : boolean;
  cache: { aqi?: Array<DisplayData>; pm25?: Array<DisplayData> };
  pins: Array<DisplayData>;
  pinPosition: Array<PinPosition>;
  stations: Array<Station>;

  constructor(private service: AppService) {
    this.cache = {};

    zip(this.service.retrieveData(), this.service.getPins()).subscribe(
      ([stations, pinPosition]: [any, Array<PinPosition>]) => {
        this.stations = stations;
        this.pinPosition = pinPosition;    
        this.cache.aqi = this.constructOutput(stations, 'aqi');
        this.pins = this.cache.aqi;
      }
    );
  }

  ngOnChanges(changes: { type: { currentValue: string }}): void {
    if (changes.type) {
      const type = changes.type.currentValue;
      if (this.cache.hasOwnProperty(type)) {
        this.pins = this.cache[type];
        return;
      }
      this.pins = this.constructOutput(this.stations, type);
    }
  }

  onMousedown(event: Event) {
    if (!this.isEditMode) {
      return;
    }
    event.preventDefault();
    const target = [].slice.call(event['path']).find(element => element.id && (element.id.startsWith('tooltip-') || element.id.startsWith('pin-')));
    if (target) {
      this.dragElement(target);
    }
  }

  dragElement(elem: HTMLElement) {
    if (!elem) {
      return;
    }

    const dragMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = event.clientX;
      pos4 = event.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    const elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - event.clientX;
      pos2 = pos4 - event.clientY;
      pos3 = event.clientX;
      pos4 = event.clientY;
      // set the element's new position:
      elem.style.top = (elem.offsetTop - pos2) + "px";
      elem.style.left = (elem.offsetLeft - pos1) + "px";
    }

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elem.onmousedown = dragMouseDown;

  }

  constructOutput(stations: Array<Station>, type: string): Array<DisplayData> {
    const output = [];
    if (!stations) {
      return output;
    }

    this.pinPosition.forEach((position, i) => {
      const { stationId, x, y, tooltipX, tooltipY, province, zIndex } = position;
      const station: Station = stations.find(station => station.stationID === stationId);
      if (!station) {
        return;
      }

      const id = type.toUpperCase();
      const value = station.LastUpdate[id][Config.path[type]];
      const shownData = {
        index: i + 1,
        x,
        y,
        tooltipX,
        tooltipY,
        province,
        location: station.areaTH.split(',')[0],
        value,
        color: this[`get${id}Color`](+value),
        provinceColor: this.getProvinceColor(station.areaTH),
        isValid: this.isValidValue(station.LastUpdate),
        zIndex: zIndex ? zIndex : 0
      };
      output.push(shownData);
    });
    return output;
  }

  private getAQIColor(value: number): string {
    if (value >= 0 && value < 26) {
      return PinColor.veryGood;
    } else if (value >= 26 && value < 51) {
      return PinColor.good;
    } else if (value >= 51 && value < 101) {
      return PinColor.normal;
    } else if (value >= 101 && value < 201) {
      return PinColor.bad;
    } else if (value >= 201) {
      return PinColor.veryBad;
    }
  }

  private getPM25Color(value: number): string {
    if (value >= 0 && value < 26) {
      return PinColor.veryGood;
    } else if (value >= 26 && value < 38) {
      return PinColor.good;
    } else if (value >= 38 && value < 51) {
      return PinColor.normal;
    } else if (value >= 51 && value <= 90) {
      return PinColor.bad;
    } else if (value > 90) {
      return PinColor.veryBad;
    }
  }

  private getProvinceColor(value: string): string {
    if (!value || typeof value !== 'string') {
      return;
    }
    const province = value.split(',')[1].trim();
    return ProvinceColor[province];
  }

  private isValidValue({ date, time }: { date: string; time: string }): boolean {
    const lastUpdated = moment(`${date} ${time}`);
    const diff = moment().diff(lastUpdated, 'hours');
    return diff <= 1;
  }
}
