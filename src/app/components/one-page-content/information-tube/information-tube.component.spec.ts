import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTubeComponent } from './information-tube.component';

describe('InformationTubeComponent', () => {
  let component: InformationTubeComponent;
  let fixture: ComponentFixture<InformationTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
