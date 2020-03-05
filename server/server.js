const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 8443;

app.get('/api/patterns', (req, res) => {
    const filePath = path.join(__dirname, 'store', 'patterns');
    const rawData = fs.readFileSync(filePath, 'utf8');

    res.json(JSON.parse(rawData));
});

app.get('/api/chunks/verb', (req, res) => {
    const filePath = path.join(__dirname, 'store', 'chunks_verb');
    const rawData = fs.readFileSync(filePath, 'utf8');

    res.json(JSON.parse(rawData));
});

app.get('/api/chunks/adverb', (req, res) => {
    const filePath = path.join(__dirname, 'store', 'chunks_adverb');
    const rawData = fs.readFileSync(filePath, 'utf8');

    res.json(JSON.parse(rawData));
});

app.post('/api/patterns', (req, res) => {
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', 'patterns');
    const rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = { id: Date.now(), english, korean };
    rawdata.push(data);

    fs.writeFileSync(filePath, JSON.stringify(rawdata));

    res.status(200);
    res.end();
});

app.post('/api/chunks/verb', (req, res) => {
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', 'chunks_verb');
    const rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = { id: Date.now(), english, korean };
    rawdata.push(data);

    fs.writeFileSync(filePath, JSON.stringify(rawdata));

    res.status(200);
    res.end();
});

app.post('/api/chunks/adverb', (req, res) => {
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', 'chunks_adverb');
    const rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = { id: Date.now(), english, korean };
    rawdata.push(data);

    fs.writeFileSync(filePath, JSON.stringify(rawdata));

    res.status(200);
    res.end();
});

app.delete('/api/patterns', (req, res) => {
    const id = req.query.id;

    const filePath = path.join(__dirname, 'store', 'patterns');
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.id == id);
    array.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(array));

    res.json(array);
});

app.delete('/api/chunks/verb', (req, res) => {
    const id = req.query.id;

    const filePath = path.join(__dirname, 'store', 'chunks_verb');
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.id == id);
    array.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(array));

    res.json(array);
});

app.delete('/api/chunks/adverb', (req, res) => {
    const id = req.query.id;

    const filePath = path.join(__dirname, 'store', 'chunks_adverb');
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.id == id);
    array.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(array));

    res.json(array);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
