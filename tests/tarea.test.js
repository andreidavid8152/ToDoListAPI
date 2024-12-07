const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const rutasTareas = require('../routes/tareas');
const Tarea = require('../models/Tarea');

let app;
let mongoServer;

beforeAll(async () => {
    // Inicia MongoDB en memorias
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use('/api/tareas', rutasTareas);
});

afterAll(async () => {
    // Limpia la BD y cierra conexiones
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Pruebas de la API de Tareas', () => {
    let tareaId;

    it('Debe crear una tarea', async () => {
        const nuevaTarea = {
            titulo: 'Test Tarea',
            descripcion: 'Descripción de prueba'
        };

        const response = await request(app)
            .post('/api/tareas')
            .send(nuevaTarea)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('titulo', 'Test Tarea');
        expect(response.body).toHaveProperty('descripcion', 'Descripción de prueba');
        expect(response.body).toHaveProperty('estado', 'pendiente');
        expect(response.body).toHaveProperty('id');

        tareaId = response.body.id;
    });

    it('Debe obtener todas las tareas', async () => {
        const response = await request(app)
            .get('/api/tareas')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('titulo', 'Test Tarea');
    });

    it('Debe actualizar el estado de una tarea', async () => {
        const response = await request(app)
            .patch(`/api/tareas/${tareaId}`)
            .send({ estado: 'completada' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('estado', 'completada');
    });

    it('Debe eliminar una tarea', async () => {
        const response = await request(app)
            .delete(`/api/tareas/${tareaId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('mensaje', 'Tarea eliminada exitosamente');
    });

    it('La lista de tareas debe estar vacía luego de eliminar la tarea', async () => {
        const response = await request(app)
            .get('/api/tareas')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });
});
