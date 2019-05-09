import { Component, OnInit } from '@angular/core';
import { Patrimony } from '../../../model/patrimony';
import { Router } from '@angular/router';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { saveAs } from 'file-saver';

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
        private router: Router
    ) { }

    ngOnInit() {
        this.patrimonyService.getAllNotWriteOff().subscribe(
            (data) => {
                this.allRows = Object.assign([], data);
                this.rows = Object.assign([], data);
            });
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
            });
    }

    writeOff() {

    }

}