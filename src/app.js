// src/app.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes'); // Importa el enrutador de src/routes

// Middlewares (si los tienes)
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar errores de validación
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🔌 Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Usa las rutas definidas en src/routes/index.js
app.use('/api', routes);

// Configura el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
