
import { Router } from 'express';
import DesenvolvedoraController from '../controllers/DesenvolvedoraController.js';

const router = Router();

router.get('/', DesenvolvedoraController.listar);
router.post('/', DesenvolvedoraController.cadastrar);

router.get('/:id/jogos', DesenvolvedoraController.listarJogos);
router.get('/:id', DesenvolvedoraController.buscarPorId);

router.put('/:id', DesenvolvedoraController.atualizar);
router.delete('/:id', DesenvolvedoraController.excluir);

export default router;
