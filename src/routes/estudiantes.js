const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', (request, response) => {
    response.render('estudiantes/agregar');
});

// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };
    await queries.insertarEstudiante(nuevoEstudiante);
    response.redirect('/estudiantes');
});

// Endpoint que permite mostrar el formulario para editar un estudiante
router.get('/editar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    const estudiante = estudiantes.find(est => est.idestudiante === idestudiante);
    response.render('estudiantes/editar', { estudiante });
});

// Endpoint para actualizar un estudiante
router.post('/editar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body;
    const estudianteActualizado = { nombre, apellido, email, idcarrera, usuario };
    await queries.actualizarEstudiante(idestudiante, estudianteActualizado);
    response.redirect('/estudiantes');
});

// Endpoint para eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

module.exports = router;