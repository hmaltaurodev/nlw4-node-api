import { Router } from 'express';
import { SendMailController } from '../controllers/SendMailController';

const sendMailRouter = Router();
const sendMailController = new SendMailController();

sendMailRouter.post('/sendMail', sendMailController.execute);

export { sendMailRouter };
