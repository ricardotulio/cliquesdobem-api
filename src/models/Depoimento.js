var mongoose = require('mongoose');

var DepoimentoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  depoimento: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

module.exports = DepoimentoSchema;