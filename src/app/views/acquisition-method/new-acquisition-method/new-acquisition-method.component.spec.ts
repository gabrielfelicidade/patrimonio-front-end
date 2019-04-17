/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewAcquisitionMethodComponent } from './new-acquisition-method.component';

describe('NewAcquisitionMethodComponent', () => {
  let component: NewAcquisitionMethodComponent;
  let fixture: ComponentFixture<NewAcquisitionMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAcquisitionMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAcquisitionMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
