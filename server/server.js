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

app.post('/api/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const filePath = path.join(__dirname, 'store', 'user');
    const rawData = fs.readFileSync(filePath, 'utf8');

    const array = JSON.parse(rawData);
    const index = array.findIndex(element => element.username == username);

    if (index === -1) {
        const data = { id: Date.now(), username, password, isPublicPatterns: false, isPublicChunks: false };
        array.push(data);
        
        fs.writeFileSync(filePath, JSON.stringify(array));

        const dirPath = path.join(__dirname, 'store');

        fs.mkdirSync(path.join(dirPath, username));
        fs.writeFileSync(path.join(dirPath, username, 'patterns'), '[]');
        fs.writeFileSync(path.join(dirPath, username, 'chunks_verb'), '[]');
        fs.writeFileSync(path.join(dirPath, username, 'chunks_adverb'), '[]');

        res.json(data);
    } else {
        if (array[index].password === password) {
            res.json(array[index]);
        } else {
            res.json(null);
        }
    }
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
