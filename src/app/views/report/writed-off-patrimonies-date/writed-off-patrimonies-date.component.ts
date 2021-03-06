import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../services/report/report.service';

@Component({
  selector: 'app-writed-off-patrimonies-date',
  templateUrl: './writed-off-patrimonies-date.component.html',
  styleUrls: ['./writed-off-patrimonies-date.component.scss']
})
export class WritedOffPatrimoniesDateComponent implements OnInit {

  years: number[] = [];
  months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  selectedYear: number = 0;
  selectedMonth: number = 0;

  constructor(
    private reportService: ReportService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.reportService.getMinMaxYearWritedOff().subscribe(
      (data) => {
        for (let i = data.minYear; i <= data.maxYear; i++) {
          this.years.push(i);
        }
      });
  }

  openReport() {
    if (this.isFormValid()) {
      this.reportService.getWritedOffByYearAndMonthReport(this.selectedYear, this.selectedMonth).subscribe(
        (obj) => {
          let blob = new Blob([obj], { type: 'application/pdf' });
          let reportURL = URL.createObjectURL(blob);
          window.open(reportURL, '_blank');
        });
    }
  }

  isFormValid() {
    let isValid: boolean = true;

    if (this.selectedMonth == 0) {
      isValid = false;
      this.toastr.error('Um mês deve ser selecionado.', 'Erro!');
    }

    if (this.selectedYear == 0) {
      isValid = false;
      this.toastr.error('Um ano deve ser selecionado.', 'Erro!');
    }

    return isValid;
  }

}
