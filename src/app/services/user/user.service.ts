import { Injectable } from '@angular/core';
import { ICrud } from '../../interfaces/ICrud';
import { User } from '../../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../constants/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService implements ICrud<User> {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(ApiConfig.USERS.Base + '/' + id);
  }
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(ApiConfig.USERS.Base);
  }
  insert(model: User): Observable<User> {
    return this.httpClient.post<User>(ApiConfig.USERS.Base, model);
  }
  update(model: User): Observable<User> {
    return this.httpClient.put<User>(ApiConfig.USERS.Base, model);
  }
  delete(id: number): Observable<User> {
    return this.httpClient.delete<User>(ApiConfig.USERS.Base + '/' + id);
  }
  changePassword(model: User): Observable<User> {
    return this.httpClient.put<User>(ApiConfig.USERS.Base, model);
  }

}
