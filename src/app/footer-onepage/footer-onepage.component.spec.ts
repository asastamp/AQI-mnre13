import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOnepageComponent } from './footer-onepage.component';

describe('FooterOnepageComponent', () => {
  let component: FooterOnepageComponent;
  let fixture: ComponentFixture<FooterOnepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterOnepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterOnepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
