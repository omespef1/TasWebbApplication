import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcassionalRutesComponent } from './ocassional-rutes.component';

describe('OcassionalRutesComponent', () => {
  let component: OcassionalRutesComponent;
  let fixture: ComponentFixture<OcassionalRutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcassionalRutesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcassionalRutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
