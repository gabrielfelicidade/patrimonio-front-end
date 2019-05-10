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
        brand: '',
        locationDescription: ''
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
                    element.brand.toLowerCase().includes(this.descriptionFilter.brand.toLowerCase()) &&
                    element.location.description.toLowerCase().includes(this.descriptionFilter.locationDescription.toLowerCase())) {
                    this.rows.push(element);
                }
            });
    }

    exportToExcel() {
        this.patrimonyService.exportToExcel(this.allRows.filter(patrimony => patrimony.chosen)).subscribe(
            (data) => {
                saveAs(data, 'export.xlsx');
                this.receiveDataFromApi();
                this.toastr.success('Os patrimonios selecionados foram exportados e estão em processo de baixa!', 'Sucesso!');
            }, 
            (err) => {
                this.toastr.error('Erro ao exportar os patrimônios!', 'Erro!');
            });
    }

    writeOff() {
        this.modalService.open(InWriteOffPatrimonyComponent, { size: 'lg' });
    }

    receiveDataFromApi() {
        this.patrimonyService.getAllNotWriteOff().subscribe(
            (data) => {
                this.allRows = Object.assign([], data);
                this.rows = Object.assign([], data);
            }, 
            (err) => {
                this.toastr.error('Erro ao receber os patrimônios!', 'Erro!');
            });
    }

}