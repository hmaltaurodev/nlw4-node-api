import express from 'express';

const app = express();

app.get('/hello_world', (req, res) => {
    return res.json({
        message: 'Hello World - NLW04'
    });
});
app.listen(3000, () => console.log('Server is running!'));
