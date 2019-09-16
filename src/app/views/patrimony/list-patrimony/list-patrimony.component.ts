import { Component, OnInit } from '@angular/core';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { Patrimony } from '../../../model/patrimony';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    locationDescription: '',
    brand: '',
    status: 3
  };
  messages = {
    'emptyMessage': 'Nenhum registro encontrado',
    'totalMessage': 'total'
  };
  canEdit: boolean;

  constructor(
    public patrimonyService: PatrimonyService,
    private router: Router,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.patrimonyService.getAll().subscribe(
      (data) => {
        this.allRows = Object.assign([], data);
        this.rows = Object.assign([], data);
      }, 
      (err) => {
        this.toastr.error('Erro ao receber os patrimônios!', 'Erro!');
      });
    let decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.canEdit = decodedToken.userlevel >= this.route.snapshot.data.canEdit;
  }

  filter() {
    this.rows = [];
    this.allRows.forEach(
      (element: Patrimony) => {
        if (element.patrimonyId.toString().includes(this.descriptionFilter.patrimonyId) &&
          element.description.toLowerCase().includes(this.descriptionFilter.description.toLowerCase()) &&
          element.location.description.toLowerCase().includes(this.descriptionFilter.locationDescription.toLowerCase()) &&
          element.brand.toLowerCase().includes(this.descriptionFilter.brand.toLowerCase()) &&
          (this.descriptionFilter.status == 3 || element.status == this.descriptionFilter.status)) {
          this.rows.push(element);
        }
      });
  }

  goToNew() {
    this.router.navigate(['patrimonios/novo']);
  }

}
