import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { FichaAtendimento } from './ficha-atendimento';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaAtendimentoService extends CrudService<FichaAtendimento> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}ficha-atendimento`)
   }
}
