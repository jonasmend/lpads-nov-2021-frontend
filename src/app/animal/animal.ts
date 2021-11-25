import { Cliente } from '../cliente/cliente';
import { Especie } from '../especie/especie';

export interface Animal {
  id: number,
  cliente: Cliente,
  especie: Especie,
  nome: string,
  nascimento: Date
}
