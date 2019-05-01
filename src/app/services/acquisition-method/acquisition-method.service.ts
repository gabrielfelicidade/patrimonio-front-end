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
    return this.httpClient.get<AcquisitionMethod>(ApiConfig.ACQUISITION_METHODS.Base + '/' + id);
  }
  getAll(): Observable<AcquisitionMethod[]> {
    return this.httpClient.get<AcquisitionMethod[]>(ApiConfig.ACQUISITION_METHODS.Base);
  }
  insert(model: AcquisitionMethod): Observable<AcquisitionMethod> {
    return this.httpClient.post<AcquisitionMethod>(ApiConfig.ACQUISITION_METHODS.Base, model);
  }
  update(model: AcquisitionMethod): Observable<AcquisitionMethod> {
    return this.httpClient.put<AcquisitionMethod>(ApiConfig.ACQUISITION_METHODS.Base, model);
  }
  delete(id: number): Observable<AcquisitionMethod> {
    return this.httpClient.delete<AcquisitionMethod>(ApiConfig.ACQUISITION_METHODS.Base + '/' + id);
  }

}
