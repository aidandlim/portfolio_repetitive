const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();

const https = require('https');
const privateKey = fs.readFileSync('cert/key.pem', 'utf8');
const certificate = fs.readFileSync('cert/server.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

app.use(cors());
app.use(bodyParser.json());

const PORT = 8443;

app.get('/api/auth/:username', (req, res) => {
    const username = req.params.username;

    const filePath = path.join(__dirname, 'store', 'user');
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.username == username);

    if (index === -1) {
        res.json(null);
    } else {
        const data = array[index];
        res.json({
            id: data.id,
            username: data.username,
            isPublicPatterns: data.isPublicPatterns,
            isPublicChunks: data.isPublicChunks
        });
    }
});

app.post('/api/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const filePath = path.join(__dirname, 'store', 'user');
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.username == username);

    if (index === -1) {
        const data = {
            id: Date.now(),
            username,
            password,
            isPublicPatterns: false,
            isPublicChunks: false
        };
        array.push(data);

        fs.writeFileSync(filePath, JSON.stringify(array));

        const dirPath = path.join(__dirname, 'store');

        fs.mkdirSync(path.join(dirPath, username));
        fs.writeFileSync(path.join(dirPath, username, 'patterns'), '[]');
        fs.writeFileSync(path.join(dirPath, username, 'chunks'), '[]');

        res.json(data);
    } else {
        if (array[index].password === password) {
            res.json(array[index]);
        } else {
            res.json(null);
        }
    }
});

app.put('/api/auth', (req, res) => {
    const username = req.body.username;
    const type = req.body.type;

    const filePath = path.join(__dirname, 'store', 'user');
    const rawData = fs.readFileSync(filePath, 'utf8');

    let array = JSON.parse(rawData);
    const index = array.findIndex(element => element.username == username);

    if (type === 0) {
        array[index].isPublicPatterns = !array[index].isPublicPatterns;
    } else if (type === 1) {
        array[index].isPublicChunks = !array[index].isPublicChunks;
    }

    fs.writeFileSync(filePath, JSON.stringify(array));

    const data = array[index];
    res.json({
        id: data.id,
        username: data.username,
        isPublicPatterns: data.isPublicPatterns,
        isPublicChunks: data.isPublicChunks
    });
});

app.get('/api/:login/:type', (req, res) => {
    const login = req.params.login;
    const type = req.params.type;

    const filePath = path.join(__dirname, 'store', login, type);
    const rawData = fs.readFileSync(filePath, 'utf8');

    res.json(JSON.parse(rawData));
});

app.post('/api/:login/:type', (req, res) => {
    const login = req.params.login;
    const type = req.params.type;
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', login, type);
    const rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const data = { id: Date.now(), english, korean };
    rawdata.push(data);

    fs.writeFileSync(filePath, JSON.stringify(rawdata));

    res.status(200);
    res.end();
});

app.put('/api/:login/:type', (req, res) => {
    const login = req.params.login;
    const type = req.params.type;
    const id = req.body.id;
    const english = req.body.english;
    const korean = req.body.korean;

    const filePath = path.join(__dirname, 'store', login, type);
    const rawData = fs.readFileSync(filePath, 'utf8');

    let array = JSON.parse(rawData);
    const index = array.findIndex(element => element.id == +id);
    array[index].english = english;
    array[index].korean = korean;

    fs.writeFileSync(filePath, JSON.stringify(array));

    res.json(array);
});

app.delete('/api/:login/:type/:id', (req, res) => {
    const login = req.params.login;
    const type = req.params.type;
    const id = req.params.id;

    const filePath = path.join(__dirname, 'store', login, type);
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.id == id);
    array.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(array));

    res.json(array);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
