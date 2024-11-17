// Este archivo sera utilizado para configurar todas las rutas principales del sistema
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

// Configuración de ruta inicial de la aplicación
router.get('/', isLoggedIn, async (request, response) => {
    response.render('home/home');
});

module.exports = router;