import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../model/user';
import { CustomValidators } from 'ng2-validation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  username: string;
  canDelete: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
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
      Validators.minLength(6),
      Validators.maxLength(60)
    ])],
    confirmPassword: ['', Validators.compose([
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
          this.username = data.username;
          if (this.userId == 1) {
            let controls = this.newUserForm.controls;
            controls.name.disable();
            controls.username.disable();
            controls.userlevel.disable();
            this.canDelete = false;
          }
        },
        (err) => {
          if (err.error.status == 404)
            this.toastr.error(err.error.detail, 'Erro!');
          else
            this.toastr.error('Usuário não encontrado!', 'Erro!');
          this.cancel();
          return;
        });
    } else {
      let controls = this.newUserForm.controls;
      controls.password.setValidators(Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60)
      ]));
      controls.confirmPassword.setValidators(Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(60)
      ]));
    }
  }

  save() {
    if (this.isFormValid()) {
      let obj: User = this.newUserForm.value;
      obj.userId = this.userId ? this.userId : null;

      if (this.userId) {
        if (obj.password == '') {
          delete obj.password;
        }
        this.userService.update(obj).subscribe(
          (data) => {
            this.toastr.success('Usuário alterado com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            if (err.error.status == 400)
              this.toastr.error(err.error.detail, 'Erro!');
            else
              this.toastr.error('Erro ao alterar o Usuário!', 'Erro!');
          });
      } else {
        this.userService.insert(obj).subscribe(
          (data) => {
            this.toastr.success('Usuário inserido com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            if (err.error.status == 400)
              this.toastr.error(err.error.detail, 'Erro!');
            else
              this.toastr.error('Erro ao inserir o Usuário!', 'Erro!');
          });
      }

      let helper = new JwtHelperService();
      let decodedToken = helper.decodeToken(localStorage.getItem('token'));

      if (this.username == decodedToken.sub) {
        this.router.navigate(['sair']);
      }
    }
  }

  delete() {
    if (this.userId) {
      const modalRef = this.modalService.open(ConfirmModalComponent);
      modalRef.componentInstance.passEntry.subscribe(
        (data: boolean) => {
          this.userService.delete(this.userId).subscribe(
            (data) => {
              this.toastr.success('Usuário excluído com sucesso!', 'Sucesso!');
              this.cancel();
            },
            (err) => {
              if (err.error.status == 404)
                this.toastr.error(err.error.detail, 'Erro!');
              else
                this.toastr.error('Não foi possível excluir o Usuário!', 'Erro!');
            });
        });
    }
  }

  cancel() {
    this.router.navigate(['usuarios/consulta']);
  }

  isFormValid() {
    let controls = this.newUserForm.controls;
    controls.name.setValue(controls.name.value.trim());
    controls.username.setValue(controls.username.value.trim());
    this.newUserForm.updateValueAndValidity();
    let isValid: boolean = true;

    if (controls.password.value != controls.confirmPassword.value) {
      isValid = false;
      controls.password.markAsTouched();
      controls.confirmPassword.markAsTouched();
      this.toastr.error('As senhas devem coincidir.', 'Erro!');
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
    if (controls.username.errors) {
      isValid = false;
      controls.username.markAsTouched();
      this.toastr.error('Um usuário de 6 à 30 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.name.errors) {
      isValid = false;
      controls.name.markAsTouched();
      this.toastr.error('Um nome de 8 à 50 caracteres deve ser informado.', 'Erro!');
    }
    return isValid;
  }

}
