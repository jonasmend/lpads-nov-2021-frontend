import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Animal } from './animal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends CrudService<Animal> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}animal`)
   }
}
