import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-pin-manager',
  templateUrl: './pin-manager.component.html',
  styleUrls: ['./pin-manager.component.less'],
})
export class PinManagerComponent {
  isCreatedMode = false;
  pinsPosition;
  numbersX;
  numbersY;

  createform = new FormGroup({
    stationId: new FormControl(''),
    province: new FormControl(''),
    x: new FormControl(''),
    y: new FormControl(''),
    tooltipX: new FormControl(''),
    tooltipY: new FormControl(''),
  });

  constructor(private service: AppService) {
    this.numbersX = Array(85)
      .fill('')
      .map((x, i) => -100 + i * 10);
    this.numbersY = Array(95)
      .fill('')
      .map((x, i) => -190 + i * 10);
    this.service.getPins().subscribe((pins: any) => {
      this.pinsPosition = pins;
    });
  }

  onEditClicked(event) {
    const id = event.target.id;
    const index = this.pinsPosition.findIndex((pin) => pin.stationId === id);
    if (index === -1) {
      return;
    }
    this.pinsPosition[index].edit = true;
  }

  onEditDoneClicked(event) {
    const id = event.target.id;
    const index = this.pinsPosition.findIndex((pin) => pin.stationId === id);
    if (index === -1) {
      return;
    }
    this.pinsPosition[index].edit = false;
  }

  onDeleteClicked(event) {
    const id = event.target.id;
    this.pinsPosition = this.pinsPosition.filter((pin) => pin.stationId !== id);
    this.service.deletePins(id).subscribe((pin: any) => {});
  }

  addPinClicked(event) {
    this.isCreatedMode = true;
  }

  editPinClicked(event) {
    this.isCreatedMode = false;
  }

  onSubmit(event) {
    if (this.createform.value.x) {
      const elem: HTMLElement = document.querySelector('.pin-section');
      elem.style.left = this.createform.value.x + 130 + 'px';
    }

    if (this.createform.value.y) {
      const elem: HTMLElement = document.querySelector('.pin-section');
      elem.style.top = this.createform.value.y + 220 + 'px';
    }

    if (this.createform.value.tooltipX) {
      const elem: HTMLElement = document.querySelector('.mock-tooltip');
      elem.style.left = this.createform.value.tooltipX + 130 + 'px';
    }
    if (this.createform.value.tooltipY) {
      const elem: HTMLElement = document.querySelector('.mock-tooltip');
      elem.style.top = this.createform.value.tooltipY + 220 + 'px';
    }
  }

  onSaveClicked(event) {
    const { stationId, x, y, tooltipX, tooltipY } = this.createform.value;
    this.pinsPosition = [
      ...this.pinsPosition,
      {
        stationId,
        x,
        y,
        tooltipX,
        tooltipY,
      },
    ];
    this.isCreatedMode = false;
  }
}
