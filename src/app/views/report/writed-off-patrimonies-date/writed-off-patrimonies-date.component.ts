import { Component, OnInit } from '@angular/core';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';

@Component({
  selector: 'app-writed-off-patrimonies-date',
  templateUrl: './writed-off-patrimonies-date.component.html',
  styleUrls: ['./writed-off-patrimonies-date.component.scss']
})
export class WritedOffPatrimoniesDateComponent implements OnInit {

  years: number[] = [];
  months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  selectedYear: number = 0;
  selectedMonth: number = 0;

  constructor(
    private patrimonyService: PatrimonyService
  ) { }

  ngOnInit() {
    this.patrimonyService.getMinMaxYearWritedOff().subscribe(
      (data) => {
        for(let i = data.minYear; i <= data.maxYear; i++){
          this.years.push(i);
        }
      });
  }

  openReport() {
    this.patrimonyService.getWritedOffByYearAndMonthReport(this.selectedYear, this.selectedMonth).subscribe(
      (obj) => {
        let blob = new Blob([obj], {type: 'application/pdf'});
        let reportURL = URL.createObjectURL(blob);
        window.open(reportURL, '_blank');
      });
  }

}
