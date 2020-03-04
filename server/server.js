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

app.get('/api/chunks', (req, res) => {
    const filePath = path.join(__dirname, 'store', 'chunks');
    const rawData = fs.readFileSync(filePath, 'utf8');

    res.json(JSON.parse(rawData));
});

app.post('/api/patterns', (req, res) => {
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', 'patterns');
    const rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = { id: rawdata.length, english, korean };
    rawdata.push(data);

    fs.writeFileSync(filePath, JSON.stringify(rawdata));

    res.json(data);
});

app.post('/api/chunks', (req, res) => {
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', 'chunks');
    const rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = { id: rawdata.length, english, korean };
    rawdata.push(data);

    fs.writeFileSync(filePath, JSON.stringify(rawdata));

    res.json(data);
});

app.put('/api/patterns', (req, res) => {
    res.json('put data');
});

app.put('/api/chunks', (req, res) => {
    res.json('put data');
});

app.delete('/api/patterns', (req, res) => {
    res.json('delete data');
});

app.delete('/api/chunks', (req, res) => {
    res.json('delete data');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
