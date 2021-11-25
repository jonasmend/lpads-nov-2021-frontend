import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedimentosRoutingModule } from './procedimentos-routing.module';
import { ProcedimentosListComponent } from './procedimentos-list/procedimentos-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProcedimentosFormComponent } from './procedimentos-form/procedimentos-form.component';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [
    ProcedimentosListComponent,
    ProcedimentosFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProcedimentosRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputMaskModule
  ]
})
export class ProcedimentosModule { }
