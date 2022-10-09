import { Router } from 'express';
import { NpsController } from '../controllers/NpsController';

const npsRouter = Router();
const npsController = new NpsController();

npsRouter.get('/:survey_id', npsController.execute);

export { npsRouter };
