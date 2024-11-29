import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterClientPage } from './cost-center-client.page';

describe('CostCenterPage', () => {
  let component: CostCenterClientPage;
  let fixture: ComponentFixture<CostCenterClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterClientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
