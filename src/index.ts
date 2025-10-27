import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.config.ts"
import indexRouter from "./routes/index.routes.ts";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// API Routers
app.use("/api", indexRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server with db connection
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;