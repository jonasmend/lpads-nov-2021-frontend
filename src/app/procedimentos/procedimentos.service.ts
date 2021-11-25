import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Procedimento } from './procedimento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedimentosService extends CrudService<Procedimento> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}procedimento`);
   }
}
