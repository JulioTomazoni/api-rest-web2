import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { ICandidato } from '../../database/models';
import { Knex } from '../../database/knex';
import { ETableNames } from '../../database/ETableNames';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ICandidato, 'id'> {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    partido: yup.string().required().max(6),
    cargo: yup.string().required(),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: 'Registro não encontrado'
    }
  });

  const select = Knex(ETableNames.candidato).where('id', req.params.id);
  const update = Knex(ETableNames.candidato).where('id', req.params.id).update({
    nome: req.body.nome,
    partido: req.body.partido,
    cargo: req.body.cargo
  });

  console.log(select.toString());
  console.log(update.toString());

  update.then((data) => {
    console.log(data);

    select.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.log(e.message);
    });
    return res.status(StatusCodes.OK).send('Candidato ' +req.params.id?.toString() +' editado!');
  }).catch((e) => {
    console.log(e.message);
    return res.status(StatusCodes.BAD_REQUEST).send('ERRO:' + e.message);
  });
  // .finally(() => {
  //   Knex.destroy();
  // });

};