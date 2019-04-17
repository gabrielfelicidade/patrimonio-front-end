import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../constants/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    public httpClient: HttpClient
  ) { }

  public logIn(username: string, password: string) {
    return this.httpClient.post(ApiConfig.LOGIN, { username: username, password: password });
  }

  public canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (token == 'true') {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
