const express = require('express');
const movieController = require('./controllers/movieController');
const port = process.env.PORT || 3000;
const app = express();
const movieRouter = require('./routers/movie')


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home page')
});

app.use('/movie', movieRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});