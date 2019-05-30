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
import { CustomValidators } from 'ng2-validation';
import { PatrimonyStatus } from '../../../constants/patrimony-status.enum';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new-patrimony',
  templateUrl: './new-patrimony.component.html',
  styleUrls: ['./new-patrimony.component.scss']
})
export class NewPatrimonyComponent implements OnInit {

  patrimonyId: number;
  locations: Location[] = [];
  acquisitionMethods: AcquisitionMethod[] = [];
  disableSave: boolean;

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
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  newPatrimonyForm = this.fb.group({
    patrimonyId: [0, Validators.compose([
      Validators.required,
      CustomValidators.number,
      Validators.min(1)
    ])],
    acquisitionProcessId: ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(20)
    ])],
    serialNumber: ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(15)
    ])],
    description: ['', Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ])],
    commercialInvoice: ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(20)
    ])],
    model: ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(50)
    ])],
    brand: ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(50)
    ])],
    additionalInformation: ['', Validators.compose([
      Validators.minLength(1),
      Validators.maxLength(200)
    ])],
    value: [0, Validators.compose([
      CustomValidators.number,
      Validators.min(1)
    ])],
    locationId: [0, Validators.compose([
      Validators.required,
      Validators.min(1)
    ])],
    acquisitionMethodId: [0, Validators.compose([
      Validators.required,
      Validators.min(1)
    ])],
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
          this.disableSave = false;
          if(data.status != PatrimonyStatus.Active){
            this.newPatrimonyForm.disable();
            this.disableSave = true;
          }
        },
        (err) => {
          this.toastr.error('Patrimônio não encontrado!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    if (this.isFormValid()) {
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
            this.toastr.error('Erro ao alterar o patrimônio!', 'Erro!');
          });
      } else {
        this.patrimonyService.insert(obj).subscribe(
          (data) => {
            this.toastr.success('Patrimônio inserido com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Erro ao inserir o patrimônio!', 'Erro!');
          });
      }
    }
  }

  cancel() {
    this.router.navigate(['patrimonios/consulta']);
  }

  isFormValid() {
    let controls = this.newPatrimonyForm.controls;
    controls.acquisitionProcessId.setValue(controls.acquisitionProcessId.value.trim());
    controls.serialNumber.setValue(controls.serialNumber.value.trim());
    controls.description.setValue(controls.description.value.trim());
    controls.commercialInvoice.setValue(controls.commercialInvoice.value.trim());
    controls.model.setValue(controls.model.value.trim());
    controls.brand.setValue(controls.brand.value.trim());
    controls.additionalInformation.setValue(controls.additionalInformation.value.trim());
    this.newPatrimonyForm.updateValueAndValidity();
    let isValid: boolean = true;

    if (controls.patrimonyId.errors) {
      isValid = false;
      controls.patrimonyId.markAsTouched();
      this.toastr.error('Um número de patrimônio deve ser informado.', 'Erro!');
    }
    if (controls.acquisitionProcessId.errors) {
      isValid = false;
      controls.acquisitionProcessId.markAsTouched();
      this.toastr.error('Um número de processo de aquisição de 1 à 20 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.serialNumber.errors) {
      isValid = false;
      controls.serialNumber.markAsTouched();
      this.toastr.error('Um número de série de 1 à 15 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.description.errors) {
      isValid = false;
      controls.description.markAsTouched();
      this.toastr.error('Uma descrição de 1 à 100 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.commercialInvoice.errors) {
      isValid = false;
      controls.commercialInvoice.markAsTouched();
      this.toastr.error('Uma nota fiscal de 1 à 20 caracteres deve ser informada.', 'Erro!');
    }
    if (controls.model.errors) {
      isValid = false;
      controls.model.markAsTouched();
      this.toastr.error('Um modelo de 1 à 50 caracteres deve ser informado.', 'Erro!');
    }
    if (controls.brand.errors) {
      isValid = false;
      controls.brand.markAsTouched();
      this.toastr.error('Uma marca de 1 à 50 caracteres deve ser informada.', 'Erro!');
    }
    if (controls.additionalInformation.errors) {
      isValid = false;
      controls.additionalInformation.markAsTouched();
      this.toastr.error('As informações adicionais devem conter de 1 à 200 caracteres.', 'Erro!');
    }
    if (controls.value.errors) {
      isValid = false;
      controls.value.markAsTouched();
      this.toastr.error('Um valor igual ou superior a R$ 1,00 deve ser informado.', 'Erro!');
    }
    if (controls.locationId.errors) {
      isValid = false;
      controls.locationId.markAsTouched();
      this.toastr.error('Uma localização deve ser selecionada.', 'Erro!');
    }
    if (controls.acquisitionMethodId.errors) {
      isValid = false;
      controls.acquisitionMethodId.markAsTouched();
      this.toastr.error('Um método de aquisição deve ser selecionado.', 'Erro!');
    }

    return isValid;
  }

  selectedFile: File = null;
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('ENDEREÇO', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });

  }
}
