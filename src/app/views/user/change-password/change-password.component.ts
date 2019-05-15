import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userId: number;
  user = {} as User;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  changePasswordForm = this.fb.group({
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60)
    ])],
    confirmPassword: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60)
    ])]
  });

  ngOnInit() {  }

  save() {
    if (this.isFormValid()) {
      let obj: User = this.changePasswordForm.value;

      this.userService.changePassword(obj).subscribe(
        (data) => {
          this.toastr.success('Senha alterada com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro ao alterar a senha!', 'Erro!');
        });
    }
  }

  cancel() {
    this.router.navigate(['home']);
  }

  isFormValid() {
    let controls = this.changePasswordForm.controls;
    let isValid: boolean = true;

    if (controls.password.errors) {
      isValid = false;
      controls.password.markAsTouched();
      this.toastr.error('Uma senha de 6 à 60 caracteres deve ser informada.', 'Erro!');
    }
    if (controls.password.value != controls.confirmPassword.value) {
      isValid = false;
      controls.password.markAsTouched();
      controls.confirmPassword.markAsTouched();
      this.toastr.error('As senhas devem coincidir.', 'Erro!');
    }

    return isValid;
  }

}
