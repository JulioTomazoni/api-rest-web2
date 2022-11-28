import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { IVoto } from '../../database/models';
import { Knex } from '../../database/knex';
import { ETableNames } from '../../database/ETableNames';


interface IBodyProps extends Omit<IVoto, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    cpf: yup.string().required().max(11).min(11),
    sexo: yup.string().required().max(1),
    idCandidato: yup.number().integer().required(),
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const data = [
    req.body,
  ];
  
  const insert = Knex(ETableNames.voto).insert(data);

  console.log(insert.toString());
  console.log(insert.toSQL().toNative());

  insert.then(data => {
    console.log(data);
    return res.status(StatusCodes.CREATED).send('Registro inserido com sucesso!');    
  }).catch(e => {
    console.log('ERRO:', e.message);
    return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
  });

};