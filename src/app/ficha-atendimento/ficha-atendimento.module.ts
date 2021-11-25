import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaAtendimentoRoutingModule } from './ficha-atendimento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { FichaAtendimentoListComponent } from './ficha-atendimento-list/ficha-atendimento-list.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [FichaAtendimentoListComponent],
  imports: [
    CommonModule,
    FichaAtendimentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    DialogModule,
    ButtonModule
  ]
})
export class FichaAtendimentoModule { }
