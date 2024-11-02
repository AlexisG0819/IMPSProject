const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', (request, response) => {
    response.render('carreras/agregar');
});

// Endpoint para agregar una carrera
router.post('/agregar', async (request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };
    await queries.insertarCarrera(nuevaCarrera);
    response.redirect('/carreras');
});

// Endpoint que permite mostrar el formulario para editar una carrera
router.get('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const carreras = await queries.obtenerTodasLasCarreras();
    const carrera = carreras.find(car => car.idcarrera === idcarrera);
    console.log('Carrera a editar:', carrera); // Verificar los datos obtenidos
    response.render('carreras/editar', { carrera });
});

// Endpoint para actualizar una carrera
router.post('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const { carrera } = request.body;
    const carreraActualizada = { carrera };
    try {
        await queries.actualizarCarrera(idcarrera, carreraActualizada);
        response.redirect('/carreras');
    } catch (error) {
        console.error('Error al actualizar la carrera:', error);
        response.status(500).send('Error al actualizar la carrera');
    }
});

// Endpoint para eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/carreras');
});

module.exports = router;