import { Router } from 'express';
import { CandidatosController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Seja Bem-Vindo!');
});

router.get('/candidatos', CandidatosController.getAllValidation, CandidatosController.getAll);
router.post('/candidatos', CandidatosController.createValidation, CandidatosController.create);
router.get('/candidatos/:id', CandidatosController.getByIdValidation, CandidatosController.getById);
router.put('/candidatos/:id', CandidatosController.updateByIdValidation, CandidatosController.updateById);
router.delete('/candidatos/:id', CandidatosController.deleteByIdValidation, CandidatosController.deleteById);

export { router };