const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const movieRouter = require('./routers/movie')

const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('Home page')
});

app.use("/api/movies", movieRouter)

app.use('/movies', movieRouter);
app.use(errorsHandler);
app.use(notFound);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

