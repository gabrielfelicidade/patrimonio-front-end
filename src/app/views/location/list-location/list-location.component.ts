import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { Location } from '../../../model/location';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit {

  allRows: Location[] = [];
  rows: Location[] = [];
  descriptionFilter = {
    description: ''
  };
  messages = {
    'emptyMessage': 'Nenhum registro encontrado',
    'totalMessage': 'total'
  };
  canEdit: boolean;

  constructor(
    public locationService: LocationService,
    private router: Router,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(
      (data: any) => {
        this.allRows = Object.assign([], data);
        this.rows = Object.assign([], data);
      }, 
      (err) => {
        this.toastr.error('Erro ao receber as localizações!', 'Erro!');
      });
    let decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.canEdit = decodedToken.userlevel >= this.route.snapshot.data.canEdit;
  }

  filter() {
    this.rows = [];
    this.allRows.forEach(
      (element: Location) => {
        if (element.description.toLowerCase().includes(this.descriptionFilter.description.toLowerCase())) {
          this.rows.push(element);
        }
      });
  }

  goToNew() {
    this.router.navigate(['localizacoes/novo']);
  }

}
