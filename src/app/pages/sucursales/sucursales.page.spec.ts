import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesPage } from './sucursales.page';

describe('SucursalesPage', () => {
  let component: SucursalesPage;
  let fixture: ComponentFixture<SucursalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
