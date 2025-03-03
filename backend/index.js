import express from "express";
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

app.use(express.json());

app.use('/books', booksRoutes);

app.options('*', cors());

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Database is connected');
    })
    .catch((error) => {
        console.log(error.message);
    });