import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  logIn() {
    let controls = this.loginForm.controls;
    this.authService.logIn(controls.login.value, controls.password.value).subscribe(
      (data: boolean) => {
        if (data) {
          localStorage.setItem('token', 'true');
          this.toastr.success('Logado com sucesso!', 'Sucesso!');
          this.router.navigate(['home']);
        } else {
          this.toastr.error('Usuário e/ou senha incorretos.', 'Erro!');
        }
      },
      (err) => {
        this.toastr.error('Usuário e/ou senha incorretos.', 'Erro!');
      });
  }
}
