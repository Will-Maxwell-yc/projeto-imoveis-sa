const express = require('express')
const app = express.Router()
const path = require('path')

app.use('/imoveis', require('./rotas/imoveis'))
app.use('/visita', require('./rotas/visita'))
app.use('/consultores', require('./rotas/consultores'))
app.use('/clientes', require('./rotas/clientes'))
app.use('/propostas', require('./rotas/propostas'))

app.use((req, res, next) => {
    console.log(`Requisição para: ${req.url}`);
    next();
  })

app.use('/imagens', express.static(path.join(__dirname, 'imagens')))
app.use('/imagens-imovel', express.static(path.join(__dirname, 'imagens-imovel')))
app.use('/imagens-corretor', express.static(path.join(__dirname, 'imagens-corretor')))

module.exports = app