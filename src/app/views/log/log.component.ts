import { Component, OnInit } from '@angular/core';
import { Log } from '../../model/log';
import { LogService } from '../../services/log/log.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  allRows: Log[] = [];
  rows: Log[] = [];
  descriptionFilter = {
    date: '',
    interfaceName: ''
  };
  messages = {
    'emptyMessage': 'Nenhum registro encontrado',
    'totalMessage': 'total'
  };
  
  constructor(
    public logService: LogService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.logService.getAll().subscribe(
      (data) => {
        this.allRows = Object.assign([], data);
        this.rows = Object.assign([], data);
      }, 
      (err) => {
        this.toastr.error('Erro ao receber os logs!', 'Erro!');
      });
  }

  filter() {
    this.rows = [];
    this.allRows.forEach(
      (element: Log) => {
        if (element.date.toString().includes(this.descriptionFilter.date) &&
          element.interfaceName.toLowerCase().includes(this.descriptionFilter.interfaceName.toLowerCase())) {
          this.rows.push(element);
        }
      });
  }

}
