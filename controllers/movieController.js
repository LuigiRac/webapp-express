const connection = require('../db');

function index(req, res) {
    const query = 'SELECT * FROM movies';

    connection.query(query, (err, results) => {
        res.json(results);
    });
}


function show(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM movies WHERE id = ?';

    const reviewSql =
        `SELECT * 
        FROM reviews 
        WHERE movie_id = ?`;


    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });


        const movies = results[0];

        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            movies.reviews = reviewResults;
            res.json(movies);

        })
    })
}

function storeReview(req, res) {
    const { id } = req.params;

    const { text, name, vote } = req.body;

    const addReviews = "INSERT INTO reviews ( text, name, vote, movie_id) VALUES (?, ?, ?, ?) ";

    connection.query(addReviews, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        console.log(results);

        res.status(201);
        res.json({ message: "Review aggiunta", id: results.insertId });
        // if (results.length === 0) return res.status(404).json({ error: 'Review not found' });

    })
}

module.exports = { index, show, storeReview };