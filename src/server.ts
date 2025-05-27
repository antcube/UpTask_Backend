import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';

// Dotenv configuration
dotenv.config();

// Create an Express application
const app = express();

// Database connection
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;