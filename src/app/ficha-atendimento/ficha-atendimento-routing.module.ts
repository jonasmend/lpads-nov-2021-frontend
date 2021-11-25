import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FichaAtendimentoListComponent } from './ficha-atendimento-list/ficha-atendimento-list.component';


const routes: Routes = [
  {
    path: '',
    component: FichaAtendimentoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaAtendimentoRoutingModule { }
