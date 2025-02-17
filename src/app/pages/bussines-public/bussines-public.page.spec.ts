import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinesPublicPage } from './bussines-public.page';

describe('BussinesPublicPage', () => {
  let component: BussinesPublicPage;
  let fixture: ComponentFixture<BussinesPublicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinesPublicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinesPublicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
