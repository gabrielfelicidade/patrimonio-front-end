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
  descriptionFilter: string;

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
        if (element.description.toLowerCase().includes(this.descriptionFilter.toLowerCase())) {
          this.rows.push(element);
        }
      });
  }

  goToNew() {
    this.router.navigate(['patrimonios/novo']);
  }

}
