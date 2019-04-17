/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewPatrimonyComponent } from './new-patrimony.component';

describe('NewPatrimonyComponent', () => {
  let component: NewPatrimonyComponent;
  let fixture: ComponentFixture<NewPatrimonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatrimonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatrimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
