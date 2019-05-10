import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Patrimony } from '../../../model/patrimony';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-in-write-off-patrimony',
  templateUrl: './in-write-off-patrimony.component.html',
  styleUrls: ['./in-write-off-patrimony.component.scss']
})
export class InWriteOffPatrimonyComponent implements OnInit {

  rows: Patrimony[] = [];

  constructor(
    private activeModal: NgbModal,
    private patrimonyService: PatrimonyService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.receiveDataFromApi();
  }

  close() {
    this.activeModal.dismissAll();
  }

  doWriteOff() {
    this.patrimonyService.writeOffPatrimonies(this.rows.filter(patrimony => patrimony.chosen)).subscribe(
      (data) => {
        this.receiveDataFromApi();
        this.toastr.success('Os patrimonios selecionados foram baixados com sucesso!', 'Sucesso!');
      }, 
      (err) => {
        this.toastr.error('Erro ao baixar os patrimônios!', 'Erro!');
      });
  }

  receiveDataFromApi() {
    this.patrimonyService.getAllPending().subscribe(
      (data) => {
        this.rows = Object.assign([], data);
        this.rows.forEach((element) => element.chosen = true);
      }, 
      (err) => {
        this.toastr.error('Erro ao receber os patrimônios!', 'Erro!');
      });
  }

}
