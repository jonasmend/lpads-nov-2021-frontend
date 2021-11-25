import { FichaAtendimento } from '../ficha-atendimento/ficha-atendimento';
import { Procedimento } from '../procedimentos/procedimento';

export interface ProcedimentoRealizado{
  id: number,
  fichaAtendimento: FichaAtendimento,
  procedimento: Procedimento,
  quantidade: number,
  total: number
}
