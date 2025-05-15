import express from 'express';

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

export default app;