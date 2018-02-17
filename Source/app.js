const express = require('express')
const app = express()

//homepage
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//about
app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/aboutUs.html');
});

//lessons of mendelian genetics
app.get('/mendeliangenetics_heredity', function(req, res) {
    res.sendFile(__dirname + '/mendeliangenetics_heredity.html');
});

app.get('/mendeliangenetics_dominanceAndRecessiveness', function(req, res) {
    res.sendFile(__dirname + '/mendeliangenetics_dominanceAndRecessiveness.html');
});

app.get('/mendeliangenetics_probability', function(req, res) {
    res.sendFile(__dirname + '/mendeliangenetics_probability.html');
});

app.get('/mendeliangenetics_punnettSquares', function(req, res) {
    res.sendFile(__dirname + '/mendeliangenetics_punnettSquares.html');
});

//lessons of catgen
app.get('/catgen_geneinfo', function(req, res) {
    res.sendFile(__dirname + '/catgen_geneinfo.html');
});


app.get('/CATGEN', function(req, res) {
    res.sendFile(__dirname + '/CATGEN.html');
});


app.get('/quiz', function(req, res) {
    res.sendFile(__dirname + '/quiz.html');
});

app.get('/homepage', function(req, res) {
    res.sendFile(__dirname + '/homepage.html');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))