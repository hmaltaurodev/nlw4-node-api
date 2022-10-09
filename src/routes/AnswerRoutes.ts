import { Router } from 'express';
import { AnswerController } from '../controllers/AnswerController';

const answerRouter = Router();
const answerController = new AnswerController();

answerRouter.get('/:value', answerController.execute);

export { answerRouter };
