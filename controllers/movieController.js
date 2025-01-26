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

    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);


    })
}



module.exports = { index, show };