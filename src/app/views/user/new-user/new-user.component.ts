import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../model/user';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

  userId: number;
  user = {} as User;
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  newUserForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)
    ])],
    username: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60)
    ])],
    confirmPassword: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60)
    ])],
    userlevel: ['', Validators.compose([
      Validators.required,
      CustomValidators.number,
      Validators.min(0)
    ])],
  });

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.get(this.userId).subscribe(
        (data) => {
          if (data == null) {
            this.toastr.error('Usuário não encontrado!', 'Erro!');
            this.cancel();
            return;
          }
          this.newUserForm.setValue({
            name: data.name,
            username: data.username,
            password: '',
            confirmPassword: '',
            userlevel: data.userlevel
          });
          this.user = Object.assign({}, data);
        },
        (err) => {
          this.toastr.error('Usuário não encontrado!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    if (this.isFormValid()) {
      let obj: User = this.newUserForm.value;
      obj.userId = this.userId ? this.userId : null;

      if (this.userId) {
        this.userService.update(obj).subscribe(
          (data) => {
            this.toastr.success('Usuário alterado com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Erro: ' + err, 'Erro!');
          });
      } else {
        this.userService.insert(obj).subscribe(
          (data) => {
            this.toastr.success('Usuário inserido com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Erro: ' + err, 'Erro!');
          });
      }
    }
  }

  delete() {
    if (this.userId) {
      this.userService.delete(this.userId).subscribe(
        (data) => {
          this.toastr.success('Usuário excluído com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    }
  }

  cancel() {
    this.router.navigate(['usuarios']);
  }

  isFormValid() {
    let controls = this.newUserForm.controls;
    let isValid: boolean = true;

    if (controls.name.errors) {
      isValid = false;
      controls.name.markAsTouched();
      this.toastr.error('Um nome de 8 à 50 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.username.errors) {
      isValid = false;
      controls.username.markAsTouched();
      this.toastr.error('Um nome de usuário de 6 à 30 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.password.errors) {
      isValid = false;
      controls.password.markAsTouched();
      this.toastr.error('Uma senha de 6 à 60 caracteres deve ser informada.', 'Erro!');
    }
    if (controls.userlevel.errors) {
      isValid = false;
      controls.userlevel.markAsTouched();
      this.toastr.error('Um nível de usuário deve ser escolhido.', 'Erro!');
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

