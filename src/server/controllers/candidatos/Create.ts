import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { string } from 'yup/lib/locale';

interface ICandidato {
  nome: string;
  partido: string;
  cargo: string;
}

const bodyValidate: yup.SchemaOf<ICandidato>  = yup.object().shape({
  nome: yup.string().required().min(3),
  partido: yup.string().required().max(6),
  cargo: yup.string().required(),
});


export const create = async (req: Request<{}, {}, ICandidato>, res: Response) => {
  let validatedData: ICandidato | undefined = undefined;
  

  try {
    validatedData = await bodyValidate.validate(req.body, { abortEarly : false });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return; 
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errors,
    });
  }  

  console.log(validatedData);
};