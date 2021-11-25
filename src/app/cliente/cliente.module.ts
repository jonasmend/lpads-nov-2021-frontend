import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { CalendarModule } from 'primeng/calendar';
import { ClienteAttFormComponent } from './cliente-att-form/cliente-att-form.component';
import { InputMaskModule } from 'primeng/inputmask';



@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent,
    ClienteAttFormComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    InputMaskModule
  ]
})
export class ClienteModule { }
