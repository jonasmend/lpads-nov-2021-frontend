import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Especie } from './especie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecieService extends CrudService<Especie> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}especie`)
   }
}
