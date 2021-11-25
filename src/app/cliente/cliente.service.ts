import { CrudService } from '../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cliente`)
   }
}
