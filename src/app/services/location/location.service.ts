import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICrud } from '../../interfaces/ICrud';
import { ApiConfig } from '../../constants/api.config';
import { Location } from '../../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService implements ICrud<Location> {

  constructor(
      private httpClient: HttpClient
  ) { }

  get(id: number): Observable<Location> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(ApiConfig.LOCATIONS.Base);
  }
  insert(model: Location): Observable<Location> {
    return this.httpClient.post<Location>(ApiConfig.LOCATIONS.Base, model);
  }
  update(model: Location): Observable<Location> {
    throw new Error("Method not implemented.");
  }
  delete(model: Location): Observable<Location> {
    throw new Error("Method not implemented.");
  }

}
