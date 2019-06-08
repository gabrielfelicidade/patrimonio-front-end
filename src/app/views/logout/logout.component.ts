import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {
    localStorage.removeItem('token');
    this.toastr.success('Deslogado com sucesso!', 'Sucesso!');
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
