/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatrimonyService } from './patrimony.service';

describe('Service: Patrimony', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatrimonyService]
    });
  });

  it('should ...', inject([PatrimonyService], (service: PatrimonyService) => {
    expect(service).toBeTruthy();
  }));
});
