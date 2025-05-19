import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Dotenv configuration
dotenv.config();

// Create an Express application
const app = express();

// Database connection
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', (req, res) => {
    res.json({msg: 'From server'});
})

export default app;