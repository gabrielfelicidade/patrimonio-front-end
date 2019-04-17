import { Component, OnInit } from '@angular/core';
import { AcquisitionMethodService } from '../../../services/acquisition-method/acquisition-method.service';
import { AcquisitionMethod } from '../../../model/acquisition-method';

@Component({
  selector: 'app-list-acquisition-method',
  templateUrl: './list-acquisition-method.component.html',
  styleUrls: ['./list-acquisition-method.component.scss']
})
export class ListAcquisitionMethodComponent implements OnInit {

  allRows: AcquisitionMethod[] = [];
  rows: AcquisitionMethod[] = [];
  descriptionFilter: string;

  constructor(
    public acquisitionMethodService: AcquisitionMethodService
  ) { }

  ngOnInit() {
    this.acquisitionMethodService.getAll().subscribe(
      (data) => {
        this.allRows = Object.assign([], data);
        this.rows = Object.assign([], data);
      });
  }

  filter() {
    this.rows = [];
    this.allRows.forEach(
      (element: AcquisitionMethod) => {
        if(element.description.toLowerCase().includes(this.descriptionFilter.toLowerCase())){
          this.rows.push(element);
        }
      });
  }

}
