import { Component, OnInit } from '@angular/core';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { Patrimony } from '../../../model/patrimony';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-write-off-patrimony',
  templateUrl: './write-off-patrimony.component.html',
  styleUrls: ['./write-off-patrimony.component.scss']
})
export class WriteOffPatrimonyComponent implements OnInit {

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
  canEdit: boolean;

  constructor(
    public patrimonyService: PatrimonyService,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.patrimonyService.getAllWritedOff().subscribe(
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
          element.additionalInformation.toLowerCase().includes(this.descriptionFilter.additionalInformation.toLowerCase())) {
          this.rows.push(element);
        }
      });
  }

}
