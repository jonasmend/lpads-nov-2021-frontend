import { catchError, map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AnimalService } from '../animal.service';
import { ClienteService } from '../../cliente/cliente.service';
import { Cliente } from 'src/app/cliente/cliente';
import { EspecieService } from 'src/app/especie/especie.service';
import { Especie } from 'src/app/especie/especie';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  // clientes$: Observable<Cliente[]>;
  clientes: Cliente[];
  // clientesId: number[];
  especies: Especie[];

  clienteSelecionado: Cliente;

  constructor(
    private fb: FormBuilder,
    private service: AnimalService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private especieService: EspecieService
  ) { }

  ngOnInit(): void {
    // this.clientesId = [1, 2, 3];
    //const cliente = this.service.list();//this.route.snapshot.data['cliente']; //this.service.list();
    //this.onRefresh();
    this.clienteService.list().forEach(m => this.clientes = m);
    // console.log(this.clientesId);
    this.especieService.list().forEach(m => this.especies = m)

    this.form = this.fb.group({
      id: [],
      nome: [],
      nascimento: [],
      cliente: [],
      especie: []
    });

    //this.clientes.forEach(m => this.clientesId = m.id);
  }

  /*
  onRefresh() {
    this.clientes$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        // this.handleError();
        return empty();
      })
    );
  }
  */

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSeccess = 'Animal cadastrado com sucesso!';
      let msgError = 'Erro ao cadastrar animal, tente novamente!';

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
