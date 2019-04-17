import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { Patrimony } from '../../../model/patrimony';
import { LocationService } from '../../../services/location/location.service';
import { AcquisitionMethodService } from '../../../services/acquisition-method/acquisition-method.service';
import { Location } from '../../../model/location';
import { AcquisitionMethod } from '../../../model/acquisition-method';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';

@Component({
  selector: 'app-new-patrimony',
  templateUrl: './new-patrimony.component.html',
  styleUrls: ['./new-patrimony.component.scss']
})
export class NewPatrimonyComponent implements OnInit {

  patrimonyId: number;
  locations: Location[] = [];
  acquisitionMethods: AcquisitionMethod[] = [];

  CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
  };

  constructor(
    private fb: FormBuilder,
    private patrimonyService: PatrimonyService,
    private locationService: LocationService,
    private acquisitionMethodService: AcquisitionMethodService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  newPatrimonyForm = this.fb.group({
    patrimonyId: ['', Validators.required],
    acquisitionProcessId: [''],
    serialNumber: [''],
    description: [''],
    commercialInvoice: [''],
    model: [''],
    brand: [''],
    additionalInformation: [''],
    value: [0],
    locationId: [0],
    acquisitionMethodId: [0]
  });

  ngOnInit() {
    this.locationService.getAll().subscribe(
      (data) => {
        this.locations = data;
      });
    this.acquisitionMethodService.getAll().subscribe(
      (data) => {
        this.acquisitionMethods = data;
      });
    this.patrimonyId = +this.route.snapshot.paramMap.get('id');
    if (this.patrimonyId) {
      this.patrimonyService.get(this.patrimonyId).subscribe(
        (data) => {
          if (data == null) {
            this.toastr.error('Patrimônio não encontrado!', 'Erro!');
            this.cancel();
            return;
          }
          this.newPatrimonyForm.setValue({
            patrimonyId: this.patrimonyId,
            acquisitionProcessId: data.acquisitionProcessId,
            serialNumber: data.serialNumber,
            description: data.description,
            commercialInvoice: data.commercialInvoice,
            model: data.model,
            brand: data.brand,
            additionalInformation: data.additionalInformation,
            value: data.value,
            locationId: (data.location) ? data.location.locationId : 0,
            acquisitionMethodId: (data.acquisitionMethod) ? data.acquisitionMethod.acquisitionMethodId : 0
          });
        },
        (err) => {
          this.toastr.error('Patrimônio não encontrado!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    let controls = this.newPatrimonyForm.controls;
    let obj: Patrimony = this.newPatrimonyForm.value;
    obj.location = this.locations.find((location) => location.locationId == controls.locationId.value);
    obj.acquisitionMethod = this.acquisitionMethods.find((acquisitionMethod) => acquisitionMethod.acquisitionMethodId == controls.acquisitionMethodId.value);

    if (this.patrimonyId) {
      this.patrimonyService.update(obj).subscribe(
        (data) => {
          this.toastr.success('Patrimônio alterado com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    } else {
      this.patrimonyService.insert(obj).subscribe(
        (data) => {
          this.toastr.success('Patrimônio inserido com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    }
  }

  cancel() {
    this.router.navigate(['patrimonios']);
  }

}
