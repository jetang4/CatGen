const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/aboutUs.html');
});

app.get('/mendeliangenetics_heredity', function(req, res) {
    res.sendFile(__dirname + '/mendeliangenetics_heredity.html');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))