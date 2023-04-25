import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCodePage } from './validate-code.page';

describe('ValidateCodePage', () => {
  let component: ValidateCodePage;
  let fixture: ComponentFixture<ValidateCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
