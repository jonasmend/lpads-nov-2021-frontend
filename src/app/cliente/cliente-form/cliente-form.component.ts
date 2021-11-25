import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //const cliente = this.service.list();//this.route.snapshot.data['cliente']; //this.service.list();

    this.form = this.fb.group({
      id: [],
      nome: [],
      nascimento: [],
      cpf: [],
      convenio: [],
      telefone: [],
      email: []
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

      let msgSeccess = 'Cliente cadastrado com sucesso!';
      let msgError = 'Erro ao cadastrar cliente, tente novamente!';
      if(this.form.value.id) {
        msgSeccess = 'Cadastro de cliente atualizado!';
        msgError = 'Erro ao atualizar cadastro do cliente, tente novamente!';
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
