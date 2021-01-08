import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinManagerComponent } from './pin-manager.component';

describe('PinManagerComponent', () => {
  let component: PinManagerComponent;
  let fixture: ComponentFixture<PinManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
