const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'memes',
});

const Port = 3001;

app.get('/', (req, res) => {
  db.query('SELECT * FROM memes', (err, result) => {
    if (err) {
      res.end(err);
    } else {
      res.json(result);
    }
  });
});

app.get('/num', (req, res) => {
  db.query('SELECT * FROM num', (err, result) => {
    if (err) {
      res.end(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(Port, () => {
  console.log(`Server Running on port: ${Port}`);
});
