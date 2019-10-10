import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEnlistmentsPage } from './last-enlistments.page';

describe('LastEnlistmentsPage', () => {
  let component: LastEnlistmentsPage;
  let fixture: ComponentFixture<LastEnlistmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastEnlistmentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastEnlistmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
