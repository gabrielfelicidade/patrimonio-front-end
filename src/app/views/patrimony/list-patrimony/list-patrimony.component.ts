import { Component, OnInit } from '@angular/core';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { Patrimony } from '../../../model/patrimony';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patrimony',
  templateUrl: './list-patrimony.component.html',
  styleUrls: ['./list-patrimony.component.scss']
})
export class ListPatrimonyComponent implements OnInit {

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
    this.patrimonyService.getAll().subscribe(
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

  goToNew() {
    this.router.navigate(['patrimonios/novo']);
  }

}
