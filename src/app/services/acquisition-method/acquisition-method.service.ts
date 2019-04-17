import { Injectable } from '@angular/core';
import { ICrud } from '../../interfaces/ICrud';
import { AcquisitionMethod } from '../../model/acquisition-method';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../constants/api.config';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionMethodService implements ICrud<AcquisitionMethod> {

  constructor(
    private httpClient: HttpClient
) { }

  get(id: number): Observable<AcquisitionMethod> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<AcquisitionMethod[]> {
    return this.httpClient.get<AcquisitionMethod[]>(ApiConfig.ACQUISITION_METHODS.Base);
  }
  insert(model: AcquisitionMethod): Observable<AcquisitionMethod> {
    throw new Error("Method not implemented.");
  }
  update(model: AcquisitionMethod): Observable<AcquisitionMethod> {
    throw new Error("Method not implemented.");
  }
  delete(model: AcquisitionMethod): Observable<AcquisitionMethod> {
    throw new Error("Method not implemented.");
  }

}
