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
  getAllPending(): Observable<Patrimony[]> {
    return this.httpClient.get<Patrimony[]>(ApiConfig.PATRIMONIES.AllPending);
  }
  getAllWritedOff(): Observable<Patrimony[]> {
    return this.httpClient.get<Patrimony[]>(ApiConfig.PATRIMONIES.AllWritedOff);
  }
  getAllActives(): Observable<Patrimony[]> {
    return this.httpClient.get<Patrimony[]>(ApiConfig.PATRIMONIES.AllActives);
  }
  insert(model: Patrimony): Observable<Patrimony> {
    return this.httpClient.post<Patrimony>(ApiConfig.PATRIMONIES.Base, model);
  }
  update(model: Patrimony): Observable<Patrimony> {
    return this.httpClient.put<Patrimony>(ApiConfig.PATRIMONIES.Base, model);
  }
  delete(id: number): Observable<Patrimony> {
    throw new Error("Method not implemented.");
  }
  exportToExcel(patrimonies: Patrimony[]): Observable<Blob> {
    return this.httpClient.post(ApiConfig.PATRIMONIES.ExportExcel, patrimonies, { responseType: 'blob' });
  }
  writeOff(patrimonies: Patrimony[]) {
    return this.httpClient.post(ApiConfig.PATRIMONIES.WriteOff, patrimonies);
  }
  cancelWriteOff(patrimonies: Patrimony[]){
    return this.httpClient.post(ApiConfig.PATRIMONIES.CancelWriteOff, patrimonies);
  }
  
}
