import { take, switchMap, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { empty, Subject, Observable, EMPTY } from 'rxjs';
import { ProcedimentosService } from '../procedimentos.service';
import { Procedimento } from '../procedimento';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-procedimentos-list',
  templateUrl: './procedimentos-list.component.html',
  styleUrls: ['./procedimentos-list.component.scss']
})
export class ProcedimentosListComponent implements OnInit {

  procedimentos$: Observable<Procedimento>;
  procedimentos: Procedimento[];
  cols: any[];

  first = 0;
  rows = 10;

  displayBasic: boolean;
  displayNewBasic: boolean;

  procedimentoSelecionado: Procedimento;
  procedimentoEdit: Procedimento;

  // -----------------------------------

  form: FormGroup;
  submitted = false;

  constructor(
    private service: ProcedimentosService,
    private router: Router,
    // private route: ActivatedRoute,
    private alertService: AlertModalService,
    // ----------------------------------
    private fb: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.list().forEach(m => this.procedimentos = m);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'descricao', header: 'Descricao' },
      { field: 'valor', header: 'Valor' },
      { field: "estoque", header: 'Estoque' }
    ];

    this.form = this.fb.group({
      id: [],
      descricao: [],
      valor: [],
      estoque: []
    });
  }

  onRefresh() {
    this.procedimentos$ = this.service.list()
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
      return this.first === (this.procedimentos.length - this.rows);
  }

  isFirstPage(): boolean {
      return this.first === 0;
  }

  onEdit(procedimento) {
    //this.router.navigate([id], { relativeTo: this.route});
    this.service.loadByID(procedimento.id).forEach(m => this.procedimentoEdit = m);;

    this.form = this.fb.group({
      id: [procedimento.id],
      descricao: [procedimento.descricao],
      valor: [procedimento.valor],
      estoque: [procedimento.estoque]
    });
  }

  onDelete(animal) {
    this.procedimentoSelecionado = animal;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover este cliente?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(animal.id) : EMPTY)
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
    this.service.remove(this.procedimentoSelecionado.id)
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

  showBasicNewDialog(procedimento) {
    this.displayNewBasic = true;

    this.onEdit(procedimento);
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

      let msgSeccess = 'Cadastro de animal atualizado!';
      let msgError = 'Erro ao atualizar cadastro do animal, tente novamente!';

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
