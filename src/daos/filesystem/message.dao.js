
import MessagesModel from '../mongodb/models/messages.model.js';

class MessageDAO {
    async getAllMessages() {
        try {
            const messages = await MessagesModel.find();
            return messages;
        } catch (error) {
            console.error('Error al obtener el mensaje:', error.message);
            throw error;
        }
    }

    async getMessageById(messageId) {
        try {
            const message = await MessagesModel.findById(messageId);
            return message;
        } catch (error) {
            console.error(`Error al obtener el mensaje por ID ${messageId}:`, error.message);
            throw error;
        }
    }

    async createMessage(newMessage) {
        try {
            const createdMessage = await MessagesModel.create(newMessage);
            return createdMessage;
        } catch (error) {
            console.error('Error en la creacion del mensaje:', error.message);
            throw error;
        }
    }

    async updateMessage(messageId, updatedMessage) {
        try {
            const updated = await MessagesModel.findByIdAndUpdate(messageId, updatedMessage, { new: true });
            return updated;
        } catch (error) {
            console.error(`Error en la actualizacion del mensaje con ID ${messageId}:`, error.message);
            throw error;
        }
    }

    async deleteMessage(messageId) {
        try {
            const deleted = await MessagesModel.findByIdAndDelete(messageId);
            return deleted;
        } catch (error) {
            console.error(`Error deleting message with ID ${messageId}:`, error.message);
            throw error;
        }
    }
}

export default new MessageDAO();
