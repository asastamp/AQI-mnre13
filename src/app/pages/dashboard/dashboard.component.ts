import { Component, OnInit } from '@angular/core';

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
  constructor(private service: AppService) {
    this.service.retrieveData().subscribe((data) => {
      this.items = data;
      this.updateContent('ทั้งหมด');
      this.currentTarget = document.querySelector(
        '.filter-container > .filter-item:first-child'
      );
    });
  }

  ngOnInit(): void {}

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
