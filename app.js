const express = require('express');
const app = express();

//make all images and JS and CSS files accessible
app.use(express.static(__dirname + '/Source')); //dirname refers to 'CatGen'
app.use(express.static(__dirname + '/Assets'));


//homepage
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Source/index.html');
});

//about
app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/Source/aboutUs.html');
});

//lessons of mendelian genetics
app.get('/mendeliangenetics_heredity', function(req, res) {
    res.sendFile(__dirname + '/Source/mendeliangenetics_heredity.html');
});

app.get('/mendeliangenetics_dominanceAndRecessiveness', function(req, res) {
    res.sendFile(__dirname + '/Source/mendeliangenetics_dominanceAndRecessiveness.html');
});

app.get('/mendeliangenetics_probability', function(req, res) {
    res.sendFile(__dirname + '/Source/mendeliangenetics_probability.html');
});

app.get('/mendeliangenetics_punnettSquares', function(req, res) {
    res.sendFile(__dirname + '/Source/mendeliangenetics_punnettSquares.html');
});

//lessons of catgen
app.get('/catgen_geneinfo', function(req, res) {
    res.sendFile(__dirname + '/Source/catgen_geneinfo.html');
});


app.get('/CATGEN', function(req, res) {
    res.sendFile(__dirname + '/Source/CATGEN.html');
});


app.get('/quiz', function(req, res) {
    res.sendFile(__dirname + '/Source/quiz.html');
});

app.get('/homepage', function(req, res) {
    res.sendFile(__dirname + '/Source/homepage.html');
});

var port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => console.log('Example app listening on port 3000!'))