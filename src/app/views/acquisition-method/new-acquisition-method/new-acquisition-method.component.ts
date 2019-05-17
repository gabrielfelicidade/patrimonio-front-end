import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AcquisitionMethodService } from '../../../services/acquisition-method/acquisition-method.service';
import { AcquisitionMethod } from '../../../model/acquisition-method';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-new-acquisition-method',
  templateUrl: './new-acquisition-method.component.html',
  styleUrls: ['./new-acquisition-method.component.scss']
})
export class NewAcquisitionMethodComponent implements OnInit {

  acquisitionMethodId: number;
  canDelete: boolean = true;

  constructor(
    private fb: FormBuilder,
    private acquisitionMethodService: AcquisitionMethodService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  newAcquisitionMethodForm = this.fb.group({
    description: ['', Validators.required]
  });

  ngOnInit() {
    this.acquisitionMethodId = +this.route.snapshot.paramMap.get('id');
    if (this.acquisitionMethodId) {
      this.acquisitionMethodService.get(this.acquisitionMethodId).subscribe(
        (data) => {
          if (data == null) {
            this.toastr.error('Método de Aquisição não encontrado!', 'Erro!');
            this.cancel();
            return;
          }
          this.newAcquisitionMethodForm.setValue({
            description: data.description
          });
          if (data.patrimonies.length > 0) {
            this.canDelete = false;
          }
        },
        (err) => {
          this.toastr.error('Método de Aquisição não encontrado!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    if (this.isFormValid()) {
      let obj: AcquisitionMethod = this.newAcquisitionMethodForm.value;
      obj.acquisitionMethodId = this.acquisitionMethodId;

      if (this.acquisitionMethodId) {
        this.acquisitionMethodService.update(obj).subscribe(
          (data) => {
            this.toastr.success('Método de Aquisição alterado com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Não foi possível alterar o Método de Aquisição!', 'Erro!');
          });
      } else {
        this.acquisitionMethodService.insert(obj).subscribe(
          (data) => {
            this.toastr.success('Método de Aquisição inserido com sucesso!', 'Sucesso!');
            this.cancel();
          },
          (err) => {
            this.toastr.error('Não foi possível inserir o Método de Aquisição!', 'Erro!');
          });
      }
    }
  }

  delete() {
    if (this.acquisitionMethodId) {
      const modalRef = this.modalService.open(ConfirmModalComponent);
      modalRef.componentInstance.passEntry.subscribe(
        (data: boolean) => {
          this.acquisitionMethodService.delete(this.acquisitionMethodId).subscribe(
            (data) => {
              this.toastr.success('Método de Aquisição excluído com sucesso!', 'Sucesso!');
              this.cancel();
            },
            (err) => {
              this.toastr.error('Não foi possível excluir o Método de Aquisição!', 'Erro!');
            });
        });
    }
  }

  cancel() {
    this.router.navigate(['metodos-aquisicao/consulta']);
  }

  isFormValid() {
    let controls = this.newAcquisitionMethodForm.controls;
    controls.description.setValue(controls.description.value.trim());
    this.newAcquisitionMethodForm.updateValueAndValidity();
    let isValid: boolean = true;

    if (controls.description.errors) {
      isValid = false;
      controls.description.markAsTouched();
      this.toastr.error('Uma descrição de 1 à 50 caracteres deve ser informada.', 'Erro!');
    }

    return isValid;
  }

}
