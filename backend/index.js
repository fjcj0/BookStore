import express from "express";
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRoutes.js';

const app = express();

app.use(express.json());
app.use('/books', booksRoutes);

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