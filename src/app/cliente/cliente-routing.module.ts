import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteResolverGuard } from './guards/cliente-resolver.guard';


const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent,
    resolve: {cliente: ClienteResolverGuard}
  },
  {
    path: ':id',
    component: ClienteListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
