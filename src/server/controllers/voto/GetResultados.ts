import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { Knex } from '../../database/knex';
import { ETableNames } from '../../database/ETableNames';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getResultadosValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })),
}));

export const getResultados = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  const select_voto = Knex(ETableNames.voto + ' as v')
    .select('v.*', 'c.id', 'c.nome', 'c.cargo') 
    .leftJoin('candidato as c', 'c.id', 'v.id')
    .count('v.id as count_voto')    
    .groupBy('v.idCandidato');

  if (req.query.filter != undefined) {
    select_voto.where('c.cargo', req.query.filter);
    console.log('Teste');
  }
  
  const select_voto_candidato = Knex(ETableNames.voto + ' as v')
    .select() 
    .leftJoin('candidato as c', 'c.id', 'v.id')
    .count('v.id as count_voto_candidato');

  select_voto.then(data => {
    let total = 0;

    select_voto_candidato.then(async dataAux => {
      total = Number(dataAux[0].count_voto_candidato);

    })
      .then(async () => {
        console.log(data.map(valor => {
          return 'Candidato: ' + valor.nome + ' ' + ( (Number(valor.count_voto) * 100) / total ).toFixed(2) + '% dos votos';
        }));
        await res.status(StatusCodes.OK).json(data.map(valor => {
          return 'Candidato: ' + valor.nome + ' ' + ( (Number(valor.count_voto) * 100) / total ).toFixed(2) + '% dos votos';
        }));
      })    
      .catch(e => {
        console.log('ERRO:', e.message);
        return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
      });

  }).catch(e => {
    console.log('ERRO:', e.message);
    return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
  });
  
};