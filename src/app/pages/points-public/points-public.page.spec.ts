import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsPublicPage } from './points-public.page';

describe('PointsPublicPage', () => {
  let component: PointsPublicPage;
  let fixture: ComponentFixture<PointsPublicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsPublicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsPublicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
