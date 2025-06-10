import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDedicatedPage } from './login-dedicated.page';

describe('LoginPage', () => {
  let component: LoginDedicatedPage;
  let fixture: ComponentFixture<LoginDedicatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDedicatedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDedicatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
