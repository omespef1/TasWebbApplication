import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GENPassengersPage } from './genpassengers.page';

describe('GENPassengersPage', () => {
  let component: GENPassengersPage;
  let fixture: ComponentFixture<GENPassengersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GENPassengersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GENPassengersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
