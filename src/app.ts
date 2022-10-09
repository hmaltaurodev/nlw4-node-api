import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { answerRouter } from './routes/AnswerRoutes';
import { npsRouter } from './routes/NpsRoutes';
import { sendMailRouter } from './routes/SendMailRoutes';
import { surveyRouter } from './routes/SurveyRoutes';
import { userRouter } from './routes/UserRoutes';

createConnection();
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(surveyRouter);
app.use(sendMailRouter);
app.use(answerRouter);
app.use(npsRouter);

app.get('/hello_world', (req, res) => {
    return res.status(200).json({
        message: 'Hello World - NLW04'
    });
});

export { app };
