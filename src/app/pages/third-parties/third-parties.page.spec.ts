import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartiesPage } from './third-parties.page';

describe('ThirdPartiesPage', () => {
  let component: ThirdPartiesPage;
  let fixture: ComponentFixture<ThirdPartiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
