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

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  const select = Knex(ETableNames.candidato)
    .select('*');

  console.log(select.toString());

  select.then(data => {
    for (const candidato of data) {
      console.log(candidato);
      return res.status(StatusCodes.OK).json(data);
    }
  }).catch(e => {
    console.log('ERRO:', e.message);
    return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
  });
  // .finally(() => {
  //   Knex.destroy();
  // });

  
};