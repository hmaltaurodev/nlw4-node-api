import 'reflect-metadata';
import express from 'express';
import './database';
import { userRouter } from './routes/UserRoutes';

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/hello_world', (req, res) => {
    return res.json({
        message: 'Hello World - NLW04'
    });
});

app.listen(3000, () => console.log('Server is running!'));
