import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosPage } from './contratos.page';

describe('ContratosPage', () => {
  let component: ContratosPage;
  let fixture: ComponentFixture<ContratosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
