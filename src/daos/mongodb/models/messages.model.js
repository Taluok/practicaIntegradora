import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String }, 
});

const MessagesModel = mongoose.model('Message', messageSchema);

export default MessagesModel;
