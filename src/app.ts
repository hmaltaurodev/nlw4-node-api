import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import createConnection from './database';
import { AppError } from './errors/AppError';
import { ValidateError } from './errors/ValidateError';
import { answerRouter } from './routes/AnswerRoutes';
import { npsRouter } from './routes/NpsRoutes';
import { sendMailRouter } from './routes/SendMailRoutes';
import { surveyRouter } from './routes/SurveyRoutes';
import { userRouter } from './routes/UserRoutes';

createConnection();
const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/surveys', surveyRouter);
app.use('/sendMail', sendMailRouter);
app.use('/answers', answerRouter);
app.use('/nps', npsRouter);

app.get('/hello_world', (req, res) => {
    return res.status(200).json({
        message: 'Hello World - NLW04'
    });
});

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.code).json({
            message: error.message
        });
    }
    else if (error instanceof ValidateError) {
        return res.status(error.code).json({
            message: error.message,
            error: error.body
        });
    }
    else {
        return res.status(500).json({
            message: `Internal server error ${error.message}`
        });
    }
});

export { app };
