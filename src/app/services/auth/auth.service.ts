import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../constants/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    public httpClient: HttpClient,
    public jwtHelper: JwtHelperService,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  public logIn(username: string, password: string) {
    return this.httpClient.post(ApiConfig.LOGIN, { username: username, password: password });
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    let token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      let decodedToken = this.jwtHelper.decodeToken(token);
      if(decodedToken.userlevel < route.data.canSee){
        this.toastr.error('Você não tem permissão para acessar a página!', 'Erro!');
        this.router.navigate(['home']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
