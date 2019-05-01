import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userId: number;
  user = {} as User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  newUserForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
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

  save() {
    let obj: User = this.newUserForm.value;
    obj.userlevel = this.user.userlevel ? this.user.userlevel : 0;
    obj.status = true;
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

}
