import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPublicPage } from './login-public.page';

describe('LoginPublicPage', () => {
  let component: LoginPublicPage;
  let fixture: ComponentFixture<LoginPublicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPublicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPublicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
