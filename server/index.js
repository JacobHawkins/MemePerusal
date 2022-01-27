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

app.post('/new', (req, res) => {
  // console.log('hello', req.query.new);
  db.query(
    `INSERT INTO memes(url, name, fav) VALUES("${req.query.new}", "Cute Puppy, Cat, or Pikachu", false);`,
    (err, result) => {
      if (err) {
        res.end(err);
      } else {
        res.end('sucess!');
      }
    }
  );

  app.post('/select', (req, res) => {
    db.query(
      `UPDATE num SET num = ${req.query.select} where id=1;`,
      (err, result) => {
        if (err) {
          res.end(err);
        } else {
          res.end('Success!');
        }
      }
    );
  });

  app.post('/delete', (req, res) => {
    db.query(
      `DELETE FROM memes WHERE id = ${req.query.delete};`,
      (err, result) => {
        if (err) {
          res.end(err);
        } else {
          res.end('Success!');
        }
      }
    );
  });

  res.end('Added Meme to DB!');
});

app.listen(Port, () => {
  console.log(`Server Running on port: ${Port}`);
});
