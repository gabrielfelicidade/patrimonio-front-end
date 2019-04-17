import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router
  ) { }

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
