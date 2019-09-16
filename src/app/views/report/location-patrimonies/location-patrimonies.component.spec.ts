/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocationPatrimoniesComponent } from './location-patrimonies.component';

describe('LocationPatrimoniesComponent', () => {
  let component: LocationPatrimoniesComponent;
  let fixture: ComponentFixture<LocationPatrimoniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPatrimoniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPatrimoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
