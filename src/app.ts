import express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { sendMailRouter } from './routes/SendMailRoutes';
import { surveyRouter } from './routes/SurveyRoutes';
import { userRouter } from './routes/UserRoutes';

createConnection();
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(surveyRouter);
app.use(sendMailRouter);

app.get('/hello_world', (req, res) => {
    return res.json({
        message: 'Hello World - NLW04'
    });
});

export { app };
