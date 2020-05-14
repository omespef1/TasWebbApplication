import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FueqPage } from './fueq.page';

describe('FueqPage', () => {
  let component: FueqPage;
  let fixture: ComponentFixture<FueqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FueqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FueqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
