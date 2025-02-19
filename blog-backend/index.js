const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jintu@28', 
    database: 'blog_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});


app.post('/blogs', (req, res) => {
    const { title, content, author } = req.body;
    const sql = 'INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)';
    db.query(sql, [title, content, author], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, title, content, author });
    });
});


app.get('/blogs', (req, res) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


app.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
});


app.put('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const sql = 'UPDATE blogs SET title = ?, content = ?, author = ? WHERE id = ?';
    db.query(sql, [title, content, author, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Blog updated successfully' });
    });
});


app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM blogs WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Blog deleted successfully' });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
