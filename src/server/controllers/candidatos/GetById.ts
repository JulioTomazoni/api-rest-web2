import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { Knex } from '../../database/knex';
import { ETableNames } from '../../database/ETableNames';


interface IParamProps {
  id?: number;
}
export const getByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {

  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: 'Registro não encontrado'
    }
  });

  const select = Knex(ETableNames.candidato).select('*')
    .where('id', req.params.id);

  console.log(select.toString());

  select.then(dados => {
    console.log(dados);
    return res.status(StatusCodes.OK).json(dados);
  }).catch(e => {
    console.log('ERRO:', e.message);
    return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
  });
  // .finally(() => {
  //   Knex.destroy();
  // });
};