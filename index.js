const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rutasTareas = require('./routes/tareas');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tareas',
            version: '1.0.0',
            description: 'API para gestionar tareas',
            contact: {
                name: 'Tu Nombre',
                email: 'tuemail@example.com',
            },
        },
        servers: [
            {
                url: 'https://to-do-list-api-b4a3g6cwhaf8arbh.canadacentral-01.azurewebsites.net/',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/tareas', rutasTareas);

// Conectar a la base de datos y arrancar el servidor
mongoose
    .connect(process.env.URI_MONGODB)
    .then(() => {
        console.log('Conectado a MongoDB');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error.message);
    });
