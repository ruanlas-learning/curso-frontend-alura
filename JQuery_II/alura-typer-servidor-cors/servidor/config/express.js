var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('./../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//REMOVA OS COMENTARIOS PARA HABILITAR CORS 
app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // faz que nosso navegador receba a permissão de para executar uma requisição cross-origin (CORS)
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});


consign({cwd: 'app'})
	.include('api')
	.then('routes')
	.into(app);

module.exports = app;
