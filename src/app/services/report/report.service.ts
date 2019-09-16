import { Injectable } from '@angular/core';
import { ApiConfig } from '../../constants/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getMinMaxYearWritedOff(): Observable<any> {
    return this.httpClient.get(ApiConfig.REPORTS.GetMinMaxYearWritedOff);
  }
  getWritedOffByYearAndMonthReport(year: number, month: number): Observable<Blob> {
    return this.httpClient.get(ApiConfig.REPORTS.WritedOffByYearAndMonth + `${year}/${month}`, { responseType: 'blob' });
  }
  getByLocationReport(locationId: number): Observable<Blob> {
    return this.httpClient.get(ApiConfig.REPORTS.LocationPatrimonies + `${locationId}`, { responseType: 'blob' });
  }
  getLocationsPatrimoniesReport(): Observable<Blob> {
    return this.httpClient.get(ApiConfig.REPORTS.LocationsPatrimonies, { responseType: 'blob' });
  }

}
