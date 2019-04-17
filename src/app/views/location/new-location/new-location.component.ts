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

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  newLocationForm = this.fb.group({
    description: ['', Validators.required],
    status: [true]
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
            description: data.description,
            status: data.status
          });
        },
        (err) => {
          this.toastr.error('Localização não encontrada!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    let obj: Location = this.newLocationForm.value;
    obj.locationId = this.locationId;

    if (this.locationId) {
      this.locationService.update(obj).subscribe(
        (data) => {
          this.toastr.success('Localização alterada com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          console.log(err);
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    } else {
      this.locationService.insert(obj).subscribe(
        (data) => {
          this.toastr.success('Localização inserida com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    }
  }

  cancel() {
    this.router.navigate(['localizacoes']);
  }

}
