import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/db';
import http from 'http';
import RouteUser from './routes/userRoutes';
import Organization, { EOrganization } from './models/organizations';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

connectDB();

const server = http.createServer(app);

app.use('/api', RouteUser);



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
