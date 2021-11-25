import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcedimentosListComponent } from './procedimentos-list/procedimentos-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProcedimentosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedimentosRoutingModule { }
