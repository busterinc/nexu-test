

const express = require('express');
const app = express();
const port = 3312;

require('dotenv').config();

// Importa las rutas
const brandRoute = require('./routes/brands');
const modelRoute = require('./routes/models');
const tokenRoute = require('./routes/credentials');

// Middleware para parsear JSON
app.use(express.json());

// Usa las rutas
app.use('/brands', brandRoute);
app.use('/models', modelRoute);
app.use('/token', tokenRoute);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
