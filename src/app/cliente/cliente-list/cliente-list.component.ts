import { Component, OnInit } from '@angular/core';
import { catchError, map, delay, take, switchMap } from 'rxjs/operators';
import { empty, Subject, Observable, EMPTY } from 'rxjs';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[];
  cols: any[];
  first = 0;
  rows = 10;

  clientes$: Observable<Cliente[]>;
  error$ = new Subject<boolean>();

  clienteSelecionado: Cliente;

  displayBasic: boolean;
  displayNewBasic: boolean;

  clienteEdit: Cliente;

  // -----------------------------------

  form: FormGroup
  submitted = false;

  constructor(
    private service: ClienteService,
    // private router: Router,
    // private route: ActivatedRoute,
    private alertService: AlertModalService,
    //-----------------------------------------
    private fb: FormBuilder,
    // private service: ClienteService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.list().forEach(m => this.clientes = m);
    this.onRefresh();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'nascimento', header: 'Nascimento'},
      { field: 'cpf', header: 'CPF' },
      { field: 'convenio', header: 'Convênio' },
      { field: 'telefone', header: 'Telefone' },
      //{ field: 'email', header: 'E-mail' }
      //{ field: 'edit', header: 'Edit'}
    ];
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

  onRefresh() {
    this.clientes$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar curso...');
    //this.alertService.showAlertDanger('Erro ao carregar curso...');
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.first === (this.clientes.length - this.rows);
  }

  isFirstPage(): boolean {
      return this.first === 0;
  }

  onEdit(cliente) {
    console.log(cliente);
    this.clienteEdit = cliente;
    //this.router.navigate([id], { relativeTo: this.route});
    /*const result$ = this.service.loadByID(cliente.id); //forEach(m => this.clienteEdit = m);
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.loadByID(cliente.id) : EMPTY)
    ).subscribe();
    console.log(result$);
    */
    this.form = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome],
      nascimento: [cliente.nascimento],
      cpf: [cliente.cpf],
      convenio: [cliente.convenio],
      telefone: [cliente.telefone],
      email: [cliente.email]
    });
  }

  onDelete(cliente) {
    this.clienteSelecionado = cliente;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover este cliente?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(cliente.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover cliente...');
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.clienteSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        // this.deleteModalRef.hide();
      },
      error => {
        // this.deleteModalRef.hide();
        this.alertService.showAlertDanger('Erro ao remover cliente...');
      }
    );
  }

  onDeclineDelete() {
    //this.deleteModalRef.hide();
  }


  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicNewDialog(id) {
    this.displayNewBasic = true;
    this.onEdit(id);
  }


  // ------------------------------------------------------------------------------

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
