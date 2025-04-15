import Message from '../models/Messages.js';

export async function createMessage(req, res) {
    const message = new Message(req.body);
    if(!message.name || !message.email || !message.message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    await message.save();
    res.status(200).json("Message sent successfully");
}
