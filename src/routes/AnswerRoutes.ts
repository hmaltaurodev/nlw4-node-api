import { Router } from 'express';
import { AnswerController } from '../controllers/AnswerController';

const answerRouter = Router();
const answerController = new AnswerController();

answerRouter.get('/answers/:value', answerController.execute);

export { answerRouter };
