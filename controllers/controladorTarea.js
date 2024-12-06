const Tarea = require('../models/Tarea');

// Crear una tarea
exports.crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        const tareaGuardada = await nuevaTarea.save();
        res.status(200).json(tareaGuardada);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Actualizar el estado de una tarea
exports.actualizarEstadoTarea = async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id,
            { estado: req.body.estado },
            { new: true }
        );
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        await Tarea.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Tarea eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};
