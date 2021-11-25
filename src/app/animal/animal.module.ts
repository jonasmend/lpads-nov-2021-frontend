import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalFormComponent
  ],
  imports: [
    CommonModule,
    AnimalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    DropdownModule
  ]
})
export class AnimalModule { }
