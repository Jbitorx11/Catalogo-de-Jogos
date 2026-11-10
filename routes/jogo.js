import { Router } from 'express';
import JogoController from '../controllers/JogoController.js';

const router = Router();

router.get('/', JogoController.listar);
router.post('/', JogoController.cadastrar);
router.get('/:id', JogoController.buscarPorId);
router.put('/:id', JogoController.atualizar);
router.delete('/:id', JogoController.excluir);

export default router;