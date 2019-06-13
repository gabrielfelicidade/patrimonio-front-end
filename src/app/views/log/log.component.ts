import { Component, OnInit } from '@angular/core';
import { Log } from '../../model/log';
import { LogService } from '../../services/log/log.service';
import { ToastrService } from 'ngx-toastr';
import { IMyDrpOptions } from 'mydaterangepicker';

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
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd/mm/yyyy',
    dayLabels: { su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sáb' },
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
    selectBeginDateTxt: 'Selecione a Data Inicial',
    selectEndDateTxt: 'Selecione a Data Final'
  };

  actualDate: Date = new Date();
  model: any;

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
    let filterDate: boolean = this.model != undefined;
    let minDate: Date;
    let maxDate: Date;
    if (filterDate) {
      minDate = new Date(this.model.beginDate.year + '-' + this.model.beginDate.month + '-' + this.model.beginDate.day);
      maxDate = new Date(this.model.endDate.year + '-' + this.model.endDate.month + '-' + this.model.endDate.day);
    }
    this.allRows.forEach(
      (element: Log) => {
        let localeString: string;
        let monthEndIndex: number;
        let dayEndIndex: number;
        let elementDate: Date;
        if (filterDate) {
          localeString = new Date(element.date).toLocaleDateString();
          monthEndIndex = localeString.indexOf('/');
          dayEndIndex = localeString.indexOf('/', monthEndIndex + 1);
          elementDate = new Date(localeString.substring(dayEndIndex + 1) + '-' + localeString.substring(0, monthEndIndex) + '-' + localeString.substring(monthEndIndex + 1, dayEndIndex));
          if ((elementDate >= minDate && elementDate <= maxDate) &&
            element.interfaceName.toLowerCase().includes(this.descriptionFilter.interfaceName.toLowerCase())) {
            this.rows.push(element);
          }
        }else{
          if (element.interfaceName.toLowerCase().includes(this.descriptionFilter.interfaceName.toLowerCase())) {
            this.rows.push(element);
          }
        }

      });
  }

}
