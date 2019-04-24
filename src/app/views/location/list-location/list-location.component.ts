import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { Location } from '../../../model/location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit {

  allRows: Location[] = [];
  rows: Location[] = [];
  descriptionFilter: string;

  constructor(
    public locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(
      (data: any) => {
        this.allRows = Object.assign([], data);
        this.rows = Object.assign([], data);
      });
  }

  filter() {
    this.rows = [];
    this.allRows.forEach(
      (element: Location) => {
        if (element.description.toLowerCase().includes(this.descriptionFilter.toLowerCase())) {
          this.rows.push(element);
        }
      });
  }

  goToNew() {
    this.router.navigate(['localizacoes/novo']);
  }

}
