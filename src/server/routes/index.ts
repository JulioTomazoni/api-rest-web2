import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CandidatosController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Funcionando!');
});

router.post('/candidatos', CandidatosController.create);






export { router };