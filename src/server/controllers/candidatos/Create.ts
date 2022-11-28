import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { ICandidato } from '../../database/models';
import { Knex } from '../../database/knex';
import { ETableNames } from '../../database/ETableNames';


interface IBodyProps extends Omit<ICandidato, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    partido: yup.string().required().max(6),
    cargo: yup.string().required(),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const data = [
    req.body,
  ];
  
  const insert = Knex(ETableNames.candidato).insert(data);

  console.log(insert.toString());
  console.log(insert.toSQL().toNative());

  insert.then(data => {
    console.log(data);
    return res.status(StatusCodes.CREATED).send('Registro inserido com sucesso!');    
  }).catch(e => {
    console.log('ERRO:', e.message);
    return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
  });
  // .finally(() => {
  //   Knex.destroy();
  // }); 

  
};