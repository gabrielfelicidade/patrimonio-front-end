/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WritedOffPatrimoniesDateComponent } from './writed-off-patrimonies-date.component';

describe('WritedOffPatrimoniesDateComponent', () => {
  let component: WritedOffPatrimoniesDateComponent;
  let fixture: ComponentFixture<WritedOffPatrimoniesDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritedOffPatrimoniesDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritedOffPatrimoniesDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
