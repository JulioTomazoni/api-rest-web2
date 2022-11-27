import { ICandidato } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    candidato: ICandidato
    //voto: IVoto
  }
}