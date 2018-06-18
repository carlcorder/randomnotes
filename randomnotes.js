const { DATABASE_URL } = require('./config.json');
const { Client } = require('pg');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.get('/', (req, res) => {
	getNote(res);
});

app.post('/', (req, res) => {
	let randomnotes = req.body.content;
	console.log(randomnotes);
	insertNote(randomnotes);
	res.redirect('back');
	});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

const client = new Client({
    connectionString: process.env.DATABASE_URL || DATABASE_URL,
    ssl: true,
});

client.connect().then(() => {
	client.query(`CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, content TEXT NOT NULL);`, (err, result) => {
		err ? console.error(err) : console.log("");
	});
});

let insertNote = (content) => {
    client.query(`INSERT INTO notes (content) VALUES ('${content}');`, (err, result) => {
        err ? console.log(err) : console.log(result);
    });
}

let getNote = (res) => {
	client.query(`SELECT content FROM notes ORDER BY id DESC LIMIT 1;`)
		.then(result => {
			let note = result.rows[0];
			note ? res.render('index', {note: note['content']}) : res.render('index');
		})
		.catch(err => console.error(err));
}