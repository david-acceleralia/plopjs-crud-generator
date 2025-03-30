// src/routes/index.js
const express = require('express');
const router = express.Router();

// --- Plop Router Imports ---
// Las nuevas importaciones de rutas se añadirán aquí por Plop

// Rutas base o de otros módulos
router.get('/', (req, res) => {
  res.send('API Principal funcionando!');
});

// --- Plop Router Use ---
// Las nuevas rutas se usarán aquí por Plop

module.exports = router;