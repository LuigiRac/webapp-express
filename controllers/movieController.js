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
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });


        const movies = results[0];

        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            movies.movies = reviewResults;
            res.json(movies);

        })
    })
}



module.exports = { index, show };