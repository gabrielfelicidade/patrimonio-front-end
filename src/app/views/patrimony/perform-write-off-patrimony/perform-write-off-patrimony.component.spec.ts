/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PerformWriteOffPatrimonyComponent } from './perform-write-off-patrimony.component';

describe('PerformWriteOffPatrimonyComponent', () => {
  let component: PerformWriteOffPatrimonyComponent;
  let fixture: ComponentFixture<PerformWriteOffPatrimonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformWriteOffPatrimonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformWriteOffPatrimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
