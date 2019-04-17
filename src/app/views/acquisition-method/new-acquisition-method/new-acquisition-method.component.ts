import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AcquisitionMethodService } from '../../../services/acquisition-method/acquisition-method.service';
import { AcquisitionMethod } from '../../../model/acquisition-method';

@Component({
  selector: 'app-new-acquisition-method',
  templateUrl: './new-acquisition-method.component.html',
  styleUrls: ['./new-acquisition-method.component.scss']
})
export class NewAcquisitionMethodComponent implements OnInit {

  acquisitionMethodId: number;

  constructor(
    private fb: FormBuilder,
    private acquisitionMethodService: AcquisitionMethodService,
    private toastr: ToastrService,
    private router: Router,
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
        },
        (err) => {
          this.toastr.error('Método de Aquisição não encontrado!', 'Erro!');
          this.cancel();
          return;
        });
    }
  }

  save() {
    let obj: AcquisitionMethod = this.newAcquisitionMethodForm.value;
    obj.acquisitionMethodId = this.acquisitionMethodId;

    if (this.acquisitionMethodId) {
      this.acquisitionMethodService.update(obj).subscribe(
        (data) => {
          this.toastr.success('Método de Aquisição alterado com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    } else {
      this.acquisitionMethodService.insert(obj).subscribe(
        (data) => {
          this.toastr.success('Método de Aquisição inserido com sucesso!', 'Sucesso!');
          this.cancel();
        },
        (err) => {
          this.toastr.error('Erro: ' + err, 'Erro!');
        });
    }
  }

  cancel() {
    this.router.navigate(['metodos-aquisicao']);
  }

}
