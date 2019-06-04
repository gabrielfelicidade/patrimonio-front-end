import { Component, OnInit } from '@angular/core';
import { Patrimony } from '../../../model/patrimony';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InWriteOffPatrimonyComponent } from '../in-write-off-patrimony/in-write-off-patrimony.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-perform-write-off-patrimony',
    templateUrl: './perform-write-off-patrimony.component.html',
    styleUrls: ['./perform-write-off-patrimony.component.scss']
})
export class PerformWriteOffPatrimonyComponent implements OnInit {

    allRows: Patrimony[] = [];
    rows: Patrimony[] = [];
    descriptionFilter = {
        patrimonyId: '',
        description: '',
        locationDescription: '',
        additionalInformation: ''
    };
    messages = {
        'emptyMessage': 'Nenhum registro encontrado',
        'totalMessage': 'total'
      };

    constructor(
        public patrimonyService: PatrimonyService,
        private modalService: NgbModal,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.receiveDataFromApi();
    }

    filter() {
        this.rows = [];
        this.allRows.forEach(
            (element: Patrimony) => {
                if (element.patrimonyId.toString().includes(this.descriptionFilter.patrimonyId) &&
                    element.description.toLowerCase().includes(this.descriptionFilter.description.toLowerCase()) &&
                    element.location.description.toLowerCase().includes(this.descriptionFilter.locationDescription.toLowerCase()) &&
                    element.additionalInformation.toLowerCase().includes(this.descriptionFilter.additionalInformation.toLowerCase())) {
                    this.rows.push(element);
                }
            });
    }

    exportToExcel() {
        let list: Patrimony[] = this.allRows.filter(patrimony => patrimony.chosen);
        if (list.length > 0) {
            this.patrimonyService.exportToExcel(list).subscribe(
                (data) => {
                    saveAs(data, 'export.xlsx');
                    this.receiveDataFromApi();
                    this.toastr.success('Os patrimonios selecionados foram exportados e estão em processo de baixa!', 'Sucesso!');
                },
                (err) => {
                    this.toastr.error('Erro ao exportar os patrimônios!', 'Erro!');
                });
        }
    }

    writeOff() {
        const modalRef = this.modalService.open(InWriteOffPatrimonyComponent, { size: 'lg' });
        modalRef.componentInstance.passEntry.subscribe(
            (data: boolean) => {
                if(data){
                    this.receiveDataFromApi();
                }
            });
    }

    receiveDataFromApi() {
        this.patrimonyService.getAllActives().subscribe(
            (data) => {
                this.allRows = Object.assign([], data);
                this.rows = Object.assign([], data);
            },
            (err) => {
                this.toastr.error('Erro ao receber os patrimônios!', 'Erro!');
            });
    }
}
