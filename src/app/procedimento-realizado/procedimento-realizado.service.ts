import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../shared/crud-service';
import { ProcedimentoRealizado } from './procedimento-realizado';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoRealizadoService extends CrudService<ProcedimentoRealizado> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}procedimento-realizado`);
   }
}
