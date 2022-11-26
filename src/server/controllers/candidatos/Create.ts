import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface ICandidato {
  nome: string;
  partido: string;
  cargo: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICandidato>(yup.object().shape({
    nome: yup.string().required().min(3),
    partido: yup.string().required().max(6),
    cargo: yup.string().required(),
  })),
}));

export const create = async (req: Request<{}, {}, ICandidato>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.CREATED).send('Não implementado');
};