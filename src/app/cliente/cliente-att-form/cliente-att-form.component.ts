import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-att-form',
  templateUrl: './cliente-att-form.component.html',
  styleUrls: ['./cliente-att-form.component.scss']
})
export class ClienteAttFormComponent implements OnInit {

  @Input() clienteId: number;
  @Input() clienteNome: string;
  @Input() clienteNascimento: Date;
  @Input() clienteCpf: string;
  @Input() clienteConvenio: string;
  @Input() clienteTelefone: string;
  @Input() clienteEmail: string;

  @Input() cliente: Cliente;

  form: FormGroup;
  submitted = false;

  cliente$: Observable<Cliente>;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //const cliente = []// =  this.route.snapshot.data[`cliente/${this.clienteId}`]; //this.service.loadByID(this.clienteId);
    // this.cliente$ = this.service.loadByID(this.clienteId);
    // console.log(this.cliente$);
    // cliente = this.route.snapshot.data['cliente'];
    // console.log(cliente);
    console.log(this.cliente);

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

      let msgSeccess = 'Cadastro de cliente atualizado!';
      let msgError = 'Erro ao atualizar cadastro do cliente, tente novamente!';

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
