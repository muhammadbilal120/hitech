import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import emailRouter from './routes/emailRoute.js'; // Ensure this import is correct
import marqueeRouter from './routes/marqueeRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and cloud services
connectDB();
connectcloudinary();

// Middleware
app.use(express.json());
app.use(cors(
    {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
));

// API endpoints
app.use('/api/hitech/user', userRouter);
app.use('/api/hitech/product', productRouter);
app.use('/api/hitech/cart', cartRouter);
app.use('/api/hitech/order', orderRouter);
app.use('/api/hitech/mute', marqueeRouter);
app.use('/api/hitech/send-email', emailRouter); // Ensure this endpoint is set

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
