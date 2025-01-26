const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const movieRouter = require('./routers/movie')


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home page')
});

app.use('/movies', movieRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});