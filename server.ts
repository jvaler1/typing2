import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/words', (req, res) => {
    res.json(['cat', 'dog', 'mouse']);
});

ViteExpress.listen(app, 8080, () => {
    console.log('Server is listening on port 8080...');
});