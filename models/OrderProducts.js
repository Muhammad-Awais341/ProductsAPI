import { Schema, model } from 'mongoose';

const orderProductsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantityQty: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

export default model('OrderProducts', orderProductsSchema);
