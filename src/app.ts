import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/db';
import http from 'http';
import RouteUser from './routes/userRoutes';
import Organization, { EOrganization } from './models/organizations';
import { initializeSocketServer } from './sockets/webSocket';
import { errorHandler } from "./middleware/errorHandler";
import { Server } from "socket.io";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/api', RouteUser);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  initializeSocketServer(io);




app.use(errorHandler);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
