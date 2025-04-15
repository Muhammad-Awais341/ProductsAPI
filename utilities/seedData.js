import Product from '../models/Products.js';
import User from '../models/Users.js';
import Order from '../models/Orders.js';
import OrderProducts from '../models/OrderProducts.js';

async function seedData() {
    // Check if data already exists
    const [existingProducts, existingUsers, existingOrders] = await Promise.all([
        Product.find(),
        User.find(),
        Order.find()
    ]);
  
    if (existingProducts.length === 0 && existingUsers.length === 0 && existingOrders.length === 0) {
        console.log('Seeding initial data...');
  
        // Seed Products
        const products = [
            { 
                name: 'Nike Air Max 270',
                price: 149.99,
                description: 'Nike Air Max 270 delivers unrivaled comfort with its large Air unit in the heel and foam forefoot.',
                category: 'Shoes',
                images: ['nike-airmax-270-1.jpg', 'nike-airmax-270-2.jpg']
            },
            { 
                name: 'Samsung Galaxy S21',
                price: 799.99,
                description: '5G Smartphone with 8K Video, 64MP High Resolution Camera, and 120Hz Display',
                category: 'Electronics',
                images: ['samsung-s21-1.jpg', 'samsung-s21-2.jpg']
            },
            { 
                name: 'Leather Messenger Bag',
                price: 89.99,
                description: 'Genuine leather messenger bag with multiple compartments, perfect for laptops up to 15 inches',
                category: 'Accessories',
                images: ['leather-bag-1.jpg', 'leather-bag-2.jpg']
            }
        ];
  
        const savedProducts = await Product.insertMany(products);

        // Seed Users
        const users = [
            { 
                email: 'john.doe@example.com',
                password: '$2b$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDu1Z1Wp8MGi' // hashed 'password123'
            },
            { 
                email: 'jane.smith@example.com',
                password: '$2b$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDu1Z1Wp8MGi' // hashed 'password123'
            }
        ];

        const savedUsers = await User.insertMany(users);

        // Seed OrderProducts
        const orderProducts = [
            { 
                productId: savedProducts[0]._id,
                quantityQty: 2
            },
            { 
                productId: savedProducts[1]._id,
                quantityQty: 1
            },
            { 
                productId: savedProducts[2]._id,
                quantityQty: 1
            }
        ];

        const savedOrderProducts = await OrderProducts.insertMany(orderProducts);

        // Seed Orders
        const orders = [
            {
                user: savedUsers[0]._id,
                products: [savedOrderProducts[0]._id, savedOrderProducts[2]._id],
                totalPrice: (savedProducts[0].price * 2) + savedProducts[2].price
            },
            {
                user: savedUsers[1]._id,
                products: [savedOrderProducts[1]._id],
                totalPrice: savedProducts[1].price
            }
        ];

        await Order.insertMany(orders);
        
        console.log('Database seeded successfully!');
    } else {
        console.log('Database already has data, skipping seed.');
    }
}

export default seedData;
