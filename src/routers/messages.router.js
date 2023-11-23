import express from 'express';
import MessageController from '../controllers/messages.controllers.js';

const router = express.Router();

// Ruta para obtener todos los mensajes
router.get('/', MessageController.getAllMessages);

// Ruta para obtener un mensaje por ID
router.get('/:id', MessageController.getMessageById);

// Ruta para crear un nuevo mensaje
router.post('/', MessageController.createMessage);

// Ruta para actualizar un mensaje existente
router.put('/:id', MessageController.updateMessage);

// Ruta para eliminar un mensaje
router.delete('/:id', MessageController.deleteMessage);

export default router;
