import { Component, OnInit } from '@angular/core';
import { AcquisitionMethodService } from '../../../services/acquisition-method/acquisition-method.service';
import { AcquisitionMethod } from '../../../model/acquisition-method';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-list-acquisition-method',
  templateUrl: './list-acquisition-method.component.html',
  styleUrls: ['./list-acquisition-method.component.scss']
})
export class ListAcquisitionMethodComponent implements OnInit {

  allRows: AcquisitionMethod[] = [];
  rows: AcquisitionMethod[] = [];
  descriptionFilter = {
    description: ''
  };
  messages = {
    'emptyMessage': 'Nenhum registro encontrado',
    'totalMessage': 'total'
  };
  canEdit: boolean;

  constructor(
    public acquisitionMethodService: AcquisitionMethodService,
    private router: Router,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.acquisitionMethodService.getAll().subscribe(
      (data) => {
        this.allRows = Object.assign([], data);
        this.rows = Object.assign([], data);
      }, 
      (err) => {
        this.toastr.error('Erro ao receber os métodos de aquisição!', 'Erro!');
      });
    let decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.canEdit = decodedToken.userlevel >= this.route.snapshot.data.canEdit;
  }

  filter() {
    this.rows = [];
    this.allRows.forEach(
      (element: AcquisitionMethod) => {
        if (element.description.toLowerCase().includes(this.descriptionFilter.description.toLowerCase())) {
          this.rows.push(element);
        }
      });
  }

  goToNew() {
    this.router.navigate(['metodos-aquisicao/novo']);
  }

}
