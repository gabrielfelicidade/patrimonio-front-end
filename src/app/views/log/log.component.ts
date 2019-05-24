import { Component, OnInit } from '@angular/core';
import { Log } from '../../model/log';
import { LogService } from '../../services/log/log.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  rows: Log[] = [];

  constructor(
    public logService: LogService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.logService.getAll().subscribe(
      (data) => {
        this.rows = Object.assign([], data);
      }, 
      (err) => {
        this.toastr.error('Erro ao receber os logs!', 'Erro!');
      });
  }

}
