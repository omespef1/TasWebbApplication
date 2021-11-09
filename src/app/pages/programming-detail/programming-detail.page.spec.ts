import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingDetailPage } from './programming-detail.page';

describe('ProgrammingDetailPage', () => {
  let component: ProgrammingDetailPage;
  let fixture: ComponentFixture<ProgrammingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammingDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should validate code', () => {
    
    expect(component).toBeTruthy();
  });
});
