import { ClienteService } from './../../cliente/cliente.service';
import { catchError, take, switchMap } from 'rxjs/operators';
import { Observable, Subject, empty, EMPTY } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { EspecieService } from 'src/app/especie/especie.service';
import { Especie } from 'src/app/especie/especie';
import { Cliente } from 'src/app/cliente/cliente';


@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {

  animais: Animal[];
  cols: any[];
  first = 0;
  rows = 10;

  animais$: Observable<Animal[]>;
  error$ = new Subject<boolean>();

  animalSelecionado: Animal;

  displayBasic: boolean;
  displayNewBasic: boolean;

  animalEdit: Animal;

  // -----------------------------------

  form: FormGroup;
  submitted = false;
  clientes: Cliente[];

  constructor(
    private service: AnimalService,
    private router: Router,
    // private route: ActivatedRoute,
    private alertService: AlertModalService,
    // ----------------------------------
    private fb: FormBuilder,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.service.list().forEach(m => this.animais = m);
    this.onRefresh();

    this.clienteService.list().forEach(m => this.clientes = m);


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'nascimento', header: 'Nascimento' },
      { field: "cliente", subfield: 'nome', header: 'Cliente' },
      { field: 'especie', subfield: 'descricao', header: 'Especie' }
    ];

    this.form = this.fb.group({
      id: [],
      nome: [],
      nascimento: [],
      especie: [],
      cliente: []
    });
  }

  onRefresh() {
    this.animais$ = this.service.list()
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
      return this.first === (this.animais.length - this.rows);
  }

  isFirstPage(): boolean {
      return this.first === 0;
  }

  onEdit(animal) {
    console.log(animal);
    //this.router.navigate([id], { relativeTo: this.route});
    this.service.loadByID(animal.id).forEach(m => this.animalEdit = m);

    this.form = this.fb.group({
      id: [animal.id],
      nome: [animal.nome],
      nascimento: [animal.nascimento],
      especie: [animal.especie.descricao],
      cliente: [animal.cliente]
    });
  }

  onDelete(animal) {
    this.animalSelecionado = animal;
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
    this.service.remove(this.animalSelecionado.id)
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

  showBasicNewDialog(animais) {
    this.displayNewBasic = true;
    this.onEdit(animais);
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
