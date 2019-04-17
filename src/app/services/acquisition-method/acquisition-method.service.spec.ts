/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcquisitionMethodService } from './acquisition-method.service';

describe('Service: AcquisitionMethod', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcquisitionMethodService]
    });
  });

  it('should ...', inject([AcquisitionMethodService], (service: AcquisitionMethodService) => {
    expect(service).toBeTruthy();
  }));
});
