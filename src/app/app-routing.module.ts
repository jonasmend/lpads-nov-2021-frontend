import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'ficha-atendimento'
  },
  {
    path: 'cliente',
    loadChildren: () => import ('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'animal',
    loadChildren: () => import ('./animal/animal.module').then(m => m.AnimalModule)
  },
  {
    path: 'procedimento',
    loadChildren: () => import ('./procedimentos/procedimentos.module').then(m => m.ProcedimentosModule)
  },
  {
    path: 'ficha-atendimento',
    loadChildren: () => import ('./ficha-atendimento/ficha-atendimento.module').then(m => m.FichaAtendimentoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
