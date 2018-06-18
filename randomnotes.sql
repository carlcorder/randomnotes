CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, content TEXT NOT NULL);

INSERT INTO notes (content) VALUES ('My first note.');
INSERT INTO notes (content) VALUES ('My second note.');
INSERT INTO notes (content) VALUES ('My third note.');

SELECT content FROM notes ORDER BY id DESC LIMIT 1;

DROP TABLE notes;
