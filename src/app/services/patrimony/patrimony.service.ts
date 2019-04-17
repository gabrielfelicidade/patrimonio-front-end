import { Injectable } from '@angular/core';
import { ICrud } from '../../interfaces/ICrud';
import { Patrimony } from '../../model/patrimony';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../constants/api.config';

@Injectable({
  providedIn: 'root'
})
export class PatrimonyService implements ICrud<Patrimony> {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(id: number): Observable<Patrimony> {
    return this.httpClient.get<Patrimony>(ApiConfig.PATRIMONIES.Base + '/' + id);
  }
  getAll(): Observable<Patrimony[]> {
    return this.httpClient.get<Patrimony[]>(ApiConfig.PATRIMONIES.Base);
  }
  insert(model: Patrimony): Observable<Patrimony> {
    return this.httpClient.post<Patrimony>(ApiConfig.PATRIMONIES.Base, model);
  }
  update(model: Patrimony): Observable<Patrimony> {
    return this.httpClient.put<Patrimony>(ApiConfig.PATRIMONIES.Base, model);
  }
  delete(model: Patrimony): Observable<Patrimony> {
    throw new Error("Method not implemented.");
  }

}
