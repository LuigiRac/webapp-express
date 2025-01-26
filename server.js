const express = require('express');
const postController = require('./controllers/postController');
const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home page')
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});