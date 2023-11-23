import express from 'express';
import MessageService from '../services/messages.services.js';

const router = express.Router();

// Ruta para obtener todos los mensajes
router.get('/', async (req, res, next) => {
    try {
        const messages = await MessageService.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        next(error.message);
    }
});

// Ruta para obtener un mensaje por ID
router.get('/:id', async (req, res, next) => {
    const messageId = req.params.id;
    try {
        const message = await MessageService.getMessageById(messageId);
        if (!message) {
            res.status(404).json({ msg: 'Message not found' });
        } else {
            res.status(200).json(message);
        }
    } catch (error) {
        next(error.message);
    }
});

// Ruta para crear un nuevo mensaje
router.post('/', async (req, res, next) => {
    const newMessage = req.body;
    try {
        const createdMessage = await MessageService.createMessage(newMessage);
        res.status(201).json(createdMessage);
    } catch (error) {
        next(error.message);
    }
});

// Ruta para actualizar un mensaje existente
router.put('/:id', async (req, res, next) => {
    const messageId = req.params.id;
    const updatedMessage = req.body;
    try {
        const updated = await MessageService.updateMessage(messageId, updatedMessage);
        if (!updated) {
            res.status(404).json({ msg: 'Message not found' });
        } else {
            res.status(200).json(updated);
        }
    } catch (error) {
        next(error.message);
    }
});

// Ruta para eliminar un mensaje
router.delete('/:id', async (req, res, next) => {
    const messageId = req.params.id;
    try {
        const deleted = await MessageService.deleteMessage(messageId);
        if (!deleted) {
            res.status(404).json({ msg: 'Message not found' });
        } else {
            res.status(200).json({ msg: `Message with ID ${messageId} deleted` });
        }
    } catch (error) {
        next(error.message);
    }
});

export default router;
