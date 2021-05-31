import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionalFuecPage } from './occasional-fuec.page';

describe('OccasionalFuecPage', () => {
  let component: OccasionalFuecPage;
  let fixture: ComponentFixture<OccasionalFuecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionalFuecPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionalFuecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
