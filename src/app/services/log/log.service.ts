import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../../model/log';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../constants/api.config';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<Log[]> {
    return this.httpClient.get<Log[]>(ApiConfig.LOGS);
  }

}
