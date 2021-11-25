import { Animal } from '../animal/animal';

export interface FichaAtendimento {
  id: number,
  animal: Animal,
  dataAtendimento: Date,
  finalizado: string,
  total: number
}
