import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ProcedimentosService } from '../procedimentos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-procedimentos-form',
  templateUrl: './procedimentos-form.component.html',
  styleUrls: ['./procedimentos-form.component.scss']
})
export class ProcedimentosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: ProcedimentosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      descricao: [],
      valor: [],
      estoque: []
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSeccess = 'Procedimento cadastrado com sucesso!';
      let msgError = 'Erro ao cadastrar procedimento, tente novamente!';
      if(this.form.value.id) {
        msgSeccess = 'Cadastro de procedimento atualizado!';
        msgError = 'Erro ao atualizar cadastro do procedimento, tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSeccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancel() {
    this.submitted = true;
    this.form.reset();
    console.log('onCancel');
  }

}
