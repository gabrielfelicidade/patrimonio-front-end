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
  }

  save() {
    let obj: User = this.newUserForm.value;
    obj.userlevel = 0;
    obj.status = true;

    this.userService.insert(obj).subscribe(
      (data) => {
        this.toastr.success('Usuário inserido com sucesso!', 'Sucesso!');
        this.cancel();
      },
      (err) => {
        this.toastr.error('Erro: ' + err, 'Erro!');
      });
  }

  cancel() {
    this.router.navigate(['usuarios']);
  }

}
