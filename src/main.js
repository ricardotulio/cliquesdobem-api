var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , _ = require('lodash');

var app = express();

// Middlewares necessários para Restful API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Habilitando CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allol-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization,Pragma');
  next();
});

mongoose.connect('mongodb://localhost:27017/cliquesdobem');
mongoose.connection.once('open', function() {
  // Carregamento das models
  app.models = require('./models/index');

  // Carregamento de rotas
  var routes = require('./routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  console.log('Listening on port 3000...');
  app.listen(3000);
});

