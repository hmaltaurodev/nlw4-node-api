import 'reflect-metadata';
import express from 'express';
import './database';
import { userRouter } from './routes/UserRoutes';
import { surveyRouter } from './routes/SurveyRoutes';

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(surveyRouter);

app.get('/hello_world', (req, res) => {
    return res.json({
        message: 'Hello World - NLW04'
    });
});

app.listen(3000, () => console.log('Server is running!'));
