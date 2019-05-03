import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';
import { Location } from '../../../model/location';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {

  locationId: number;
  canDelete: boolean = true;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  newLocationForm = this.fb.group({
    description: ['', Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ])]
  });

  ngOnInit() {
    this.locationId = +this.route.snapshot.paramMap.get('id');
    if (this.locationId) {
      this.locationService.get(this.locationId).subscribe(
        (data) => {
          if (data == null) {
            this.toastr.error('Localização não encontrada!', 'Erro!');
            this.cancel();
            return;
          }
          this.newLocationForm.setValue({
            description: data.description
          });
          if (data.patrimonies.length > 0) {
            this.canDelete = false;
          }
        },
        (err) => {
          this.toastr.error('Localização não encontrada!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    if (this.isFormValid()) {
      let obj: Location = this.newLocationForm.value;
      obj.locationId = this.locationId;

      if (this.locationId) {
        this.locationService.update(obj).subscribe(
          (data) => {
            this.toastr.success('Localização alterada com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Não foi possível alterar a Localização!', 'Erro!');
          });
      } else {
        this.locationService.insert(obj).subscribe(
          (data) => {
            this.toastr.success('Localização inserida com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Não foi possível inserir a Localização!', 'Erro!');
          });
      }
    }
  }

  delete() {
    if (this.locationId) {
      this.locationService.delete(this.locationId).subscribe(
        (data) => {
          this.toastr.success('Localização excluída com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Não foi possível excluir a Localização!', 'Erro!');
        });
    }
  }

  cancel() {
    this.router.navigate(['localizacoes']);
  }

  isFormValid() {
    let controls = this.newLocationForm.controls;
    let isValid: boolean = true;

    if (controls.description.errors) {
      isValid = false;
      controls.description.markAsTouched();
      this.toastr.error('Uma descrição de 1 à 100 caracteres deve ser informada.', 'Erro!');
    }

    return isValid;
  }

}
