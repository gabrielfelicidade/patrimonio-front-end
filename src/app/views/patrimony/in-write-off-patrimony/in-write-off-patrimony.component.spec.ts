/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InWriteOffPatrimonyComponent } from './in-write-off-patrimony.component';

describe('InWriteOffPatrimonyComponent', () => {
  let component: InWriteOffPatrimonyComponent;
  let fixture: ComponentFixture<InWriteOffPatrimonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InWriteOffPatrimonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InWriteOffPatrimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
