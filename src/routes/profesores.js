const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');
const moment = require('moment');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();
    response.render('profesores/listado', { profesores }); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', (request, response) => {
    response.render('profesores/agregar');
});

// Endpoint para agregar un profesor
router.post('/agregar', async (request, response) => {
    const { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email };
    await queries.insertarProfesor(nuevoProfesor);
    response.redirect('/profesores');
});

// Endpoint que permite mostrar el formulario para editar un profesor
router.get('/editar/:idprofesor', async (request, response) => {
    const { idprofesor } = request.params;
    const profesor = await queries.obtenerProfesorPorId(idprofesor);
    if (profesor) {
        profesor.fecha_nacimiento = moment(profesor.fecha_nacimiento).format('YYYY-MM-DD');
    }
    response.render('profesores/editar', { profesor });
});

// Endpoint para actualizar un profesor
router.post('/editar/:idprofesor', async (request, response) => {
    const { idprofesor } = request.params;
    const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    const profesorActualizado = { nombre, apellido, fecha_nacimiento, profesion, genero, email };
    await queries.actualizarProfesor(idprofesor, profesorActualizado);
    response.redirect('/profesores');
});

// Endpoint para eliminar un profesor
router.get('/eliminar/:idprofesor', async (request, response) => {
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/profesores');
});

module.exports = router;