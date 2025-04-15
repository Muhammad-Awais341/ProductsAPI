import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/database.js';
import seedData from './utilities/seedData.js';
import productRoutes from './routes/productRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

const startServer = async () => {
    try {
        await connectDB();
        await seedData();
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();