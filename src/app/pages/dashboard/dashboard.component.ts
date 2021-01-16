import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  items;
  displayedData = [];
  currentTarget;
  constructor(private service: AppService) {}

  ngOnInit(): void {
    zip(this.service.retrieveData(), this.service.getPins()).subscribe(
      ([stations, pins]: [any, any]) => {
        this.items = pins.map((pin) => {
          const stationObj = stations.find(station => station.stationID === pin.stationId);
          if (stationObj) {
            return stationObj;
          }
          return;
        }).filter(pin => pin);
        this.updateContent('ทั้งหมด');
        this.currentTarget = document.querySelector(
          '.filter-container > .filter-item:first-child'
        );
      }
    );
  }

  onFilterChanged(event) {
    const id = event.target.id;
    if (!id) {
      return;
    }
    this.updateHighlight(event.target);
    this.updateContent(id);
  }

  private updateHighlight(target) {
    this.currentTarget.classList.remove('selected');
    target.classList.add('selected');
    this.currentTarget = target;
  }

  private updateContent(id) {
    if (id === 'ทั้งหมด') {
      this.displayedData = this.items;
    } else {
      this.displayedData = this.items.filter((item) => {
        const regex = /, (.+)/.exec(item.areaTH);
        if (!regex || !regex[1]) {
          return false;
        }
        return regex[1] === id;
      });
    }
  }
}
