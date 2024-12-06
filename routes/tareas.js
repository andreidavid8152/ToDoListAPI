const express = require('express');
const router = express.Router();
const controladorTarea = require('../controllers/controladorTarea');

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarea:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado de la tarea
 *         titulo:
 *           type: string
 *           description: Título de la tarea
 *         descripcion:
 *           type: string
 *           description: Descripción de la tarea
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         estado:
 *           type: string
 *           enum: [pendiente, completada]
 *           description: Estado de la tarea
 *       example:
 *         titulo: "Comprar pan"
 *         descripcion: "Ir a la panadería y comprar pan fresco"
 *         estado: "pendiente"
 *         fechaCreacion: "2021-10-01T12:00:00Z"
 *         id: "6166c4f5b3e3d3e8c5b7d2f1"
 */

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarea'
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 */
router.post('/', controladorTarea.crearTarea);

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Listar todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 */
router.get('/', controladorTarea.obtenerTareas);

/**
 * @swagger
 * /api/tareas/{id}:
 *   patch:
 *     summary: Actualizar el estado de una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, completada]
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 */
router.patch('/:id', controladorTarea.actualizarEstadoTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 */
router.delete('/:id', controladorTarea.eliminarTarea);

module.exports = router;
