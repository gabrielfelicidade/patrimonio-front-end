import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../model/user';
import { MustMatch } from './password-validation';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})



export class NewUserComponent implements OnInit {

  userId: number;
  user = {} as User;
  form: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    
  ) {  }
    

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
  });
  

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

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
            password: ''
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

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;  
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
  }

  save() {
    if (this.isFormValid()) {
      let obj: User = this.newUserForm.value;
      obj.userlevel = this.user.userlevel ? this.user.userlevel : 0;
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
      this.toastr.error('Uma senha de 6 à 60 caracteres deve ser informado.', 'Erro!');
    }

    return isValid;
  }

}

