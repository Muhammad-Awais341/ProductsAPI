import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderProducts',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

export default model('Order', orderSchema);
