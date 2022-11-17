import { Request, Response } from 'express';

interface ICandidato {
  nome: string;
}




export const create = (req: Request<{}, {}, ICandidato>, res: Response) => {

  const data : ICandidato = req.body;

  console.log(data.nome);

  return res.send('Create!');
};