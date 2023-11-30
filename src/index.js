const express = require('express');
const helper = require('./ecomm-helper');
const app = express();
const port = 3000;
const skey = '';
const prjid = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.send('Pong!');
})

app.post('/signature', (req, res) => {
    let signature = helper.generateEcommSignature(req.body, skey);
    req.body.signature = signature;
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`Ecomm app listening on port ${port}`);
})