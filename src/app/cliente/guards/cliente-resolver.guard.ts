import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolverGuard implements Resolve<Cliente> {

  constructor(private service: ClienteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {

    if(route.params && route.params['id']){
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      nascimento: null,
      cpf: null,
      convenio: null,
      telefone: null,
      email: null
    });

  }

}
