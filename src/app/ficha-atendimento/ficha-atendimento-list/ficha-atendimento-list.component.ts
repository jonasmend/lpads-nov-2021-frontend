import { catchError, take, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { empty, Subject, Observable, EMPTY } from 'rxjs';
import { FichaAtendimento } from '../ficha-atendimento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FichaAtendimentoService } from '../ficha-atendimento.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProcedimentoRealizado } from 'src/app/procedimento-realizado/procedimento-realizado';
import { ProcedimentoRealizadoService } from 'src/app/procedimento-realizado/procedimento-realizado.service';
import { LazyLoadEvent } from 'primeng/api';
import { ProcedimentosService } from 'src/app/procedimentos/procedimentos.service';
import { Procedimento } from 'src/app/procedimentos/procedimento';

@Component({
  selector: 'app-ficha-atendimento-list',
  templateUrl: './ficha-atendimento-list.component.html',
  styleUrls: ['./ficha-atendimento-list.component.scss']
})
export class FichaAtendimentoListComponent implements OnInit {

  fichas: FichaAtendimento[];
  // fichas2: FichaAtendimento[];
  procedimentosRealizados: ProcedimentoRealizado[];
  procedimentos: Procedimento[];
  cols: any[];
  colsProc: any[];
  first = 0;
  rows = 10;

  fichas$: Observable<FichaAtendimento[]>;
  error$ = new Subject<boolean>();

  fichaSelecionado: FichaAtendimento;

  displayBasic: boolean;
  displayNewBasic: boolean;
  informacoes: boolean;
  finalizar: boolean;

  fichaEdit: FichaAtendimento;
  fichaFinalizar: FichaAtendimento;
  fichaInformacao: FichaAtendimento;

  totalRecords: number;
  loading: boolean;

  // -----------------------------------

  form: FormGroup;
  formPR: FormGroup;
  formFinalizar: FormGroup;
  submitted = false;

  quantidade: number;

  constructor(
    private service: FichaAtendimentoService,
    // private router: Router,
    // private route: ActivatedRoute,
    private alertService: AlertModalService,
    //-----------------------------------------
    private fb: FormBuilder,
    // private service: ClienteService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private PRservice: ProcedimentoRealizadoService,
    private Pservice: ProcedimentosService
  ) { }

  ngOnInit(): void {
    this.service.list().forEach(m => this.fichas = m );
    this.PRservice.list().forEach(m => this.procedimentosRealizados = m);
    this.Pservice.list().forEach(m => this.procedimentos = m);
    this.onRefresh();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'animal', subfield: 'nome', header: 'Animal' },
      { field: 'dataAtendimento', header: 'Atendimento'},
      { field: 'finalizado', header: 'Finalizado' },
      { field: 'total', header: 'Total' }
    ];

    this.colsProc = [
      { field: 'id', header: 'Id' },
      { field: 'fichaAtendimento',  header: 'Animal' },
      { field: 'procedimento', header: 'Procedimento'},
      { field: 'quantidade', header: 'Quantidade' },
      { field: 'total', header: 'Total' }
    ];

    this.form = this.fb.group({
      id: [],
      aninal: [],
      dataAtendimento: [],
      finalizado: [],
      total: []
    });

    this.formPR = this.fb.group({
      id: [],
      fichaAtendimento: [],
      procedimento: [],
      quantidade: [],
      total: []
    });

    this.loading = true;
  }

  onRefresh() {
    this.fichas$ = this.service.list()
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
      return this.first === (this.fichas.length - this.rows);
  }

  isFirstPage(): boolean {
      return this.first === 0;
  }

  onEdit(ficha) {
    console.log(ficha);
    this.fichaEdit = ficha;
    //this.router.navigate([id], { relativeTo: this.route});
    /*const result$ = this.service.loadByID(cliente.id); //forEach(m => this.clienteEdit = m);
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.loadByID(cliente.id) : EMPTY)
    ).subscribe();
    console.log(result$);
    */
    this.form = this.fb.group({
      id: [ficha.id],
      aninal: [ficha.animal],
      dataAtendimento: [ficha.dataAtendimento],
      finalizado: [ficha.finalizado],
      total: [ficha.total]
    });
  }
  /*
  onDelete(ficha) {
    this.fichaSelecionado = ficha;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esta ficha?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(ficha.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover ficha...');
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.fichaSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        // this.deleteModalRef.hide();
      },
      error => {
        // this.deleteModalRef.hide();
        this.alertService.showAlertDanger('Erro ao remover ficha...');
      }
    );
  }

  onDeclineDelete() {
    //this.deleteModalRef.hide();
  }
  */

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicNewDialog(ficha) {
    this.displayNewBasic = true;
    this.quantidade = 0;

    this.formPR = this.fb.group({
      id: [],
      fichaAtendimento: [ficha],
      procedimento: [],
      quantidade: [],
      total: []
    });
  }

  plusQTD() {
    this.quantidade++;
  }

  minusQTD() {
    if(this.quantidade > 0) {
      this.quantidade--;
    }
  }

  showInformacoes(ficha) {
    this.informacoes = true;
    this.fichaInformacao = ficha;

  }

  showFinalizar(ficha) {
    console.log(ficha);
    this.fichaFinalizar = ficha;
    this.finalizar = true;
  }

  onConfirmeFinalizar() {
    console.log(this.fichaFinalizar)
    let finalizado = 'S';
    this.formFinalizar = this.fb.group({
      id: [this.fichaFinalizar.id],
      finalizado: [finalizado]
    });

    let msgSeccess = 'Ficha finalizada!';
    let msgError = 'Erro ao finalizar ficha, tente novamente!';

    this.service.save(this.formFinalizar.value).subscribe(
      success => {
        this.modal.showAlertSuccess(msgSeccess);
        this.location.back();
        this.finalizar = false;
      },
      error => {
        this.modal.showAlertDanger(msgError);
        this.finalizar = false;
      }
    );
  }
  /*
  loadCarsLazy(event: LazyLoadEvent) {
    console.log(event)
    // this.loading = true;

    // setTimeout(() => {
    if (this.fichas) {
      // this.fichas = this.fichas2.slice(event.first, (event.first + event.rows));
      this.loading = false;
    }
  };
  */


  // ------------------------------------------------------------------------------

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSeccess = 'Cadastro de ficha atualizado!';
      let msgError = 'Erro ao atualizar cadastro do ficha, tente novamente!';

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

  onSubmitPR() {
    // this.submitted = true;
    console.log(this.formPR.value);
    if (this.formPR.valid) {
      console.log('submit');

      let msgSeccess = 'Procedimento salvo!';
      let msgError = 'Erro ao salvar procedimento da ficha, tente novamente!';

      this.PRservice.save(this.formPR.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSeccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  onCancelPR() {
    // this.submitted = true;
    this.formPR.reset();
    console.log('onCancel');
  }

}
