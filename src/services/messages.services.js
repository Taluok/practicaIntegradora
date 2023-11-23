// services/messages.services.js
import MessageDAO from '../dao/message.dao.js';

class MessageService {
    async getAllMessages() {
        try {
            const messages = await MessageDAO.getAllMessages();
            return messages;
        } catch (error) {
            console.error('Error getting messages:', error.message);
            throw error;
        }
    }

    async getMessageById(messageId) {
        try {
            const message = await MessageDAO.getMessageById(messageId);
            return message;
        } catch (error) {
            console.error(`Error getting message with ID ${messageId}:`, error.message);
            throw error;
        }
    }

    async createMessage(newMessage) {
        try {
            const createdMessage = await MessageDAO.createMessage(newMessage);
            return createdMessage;
        } catch (error) {
            console.error('Error creating message:', error.message);
            throw error;
        }
    }

    async updateMessage(messageId, updatedMessage) {
        try {
            const updated = await MessageDAO.updateMessage(messageId, updatedMessage);
            return updated;
        } catch (error) {
            console.error(`Error updating message with ID ${messageId}:`, error.message);
            throw error;
        }
    }

    async deleteMessage(messageId) {
        try {
            const deleted = await MessageDAO.deleteMessage(messageId);
            return deleted;
        } catch (error) {
            console.error(`Error deleting message with ID ${messageId}:`, error.message);
            throw error;
        }
    }
}

export default new MessageService();
