const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completada'],
        default: 'pendiente'
    }
});

TareaSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

TareaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);
