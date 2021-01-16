import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePageContentComponent } from './one-page-content.component';

describe('OnePageContentComponent', () => {
  let component: OnePageContentComponent;
  let fixture: ComponentFixture<OnePageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnePageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
