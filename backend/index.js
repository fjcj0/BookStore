import express from "express";
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to this page");
});

app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "All fields are required" });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send({ message: "The book is created successfully. Congratulations!", data: book });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({ count: books.length, data: books });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).send({ message: "Book not found" });
        }
        return response.status(200).json({ book });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

mongoose.connect(mongoDBURL).then(() => {
    console.log('Database is connected');
}).catch((error) => {
    console.log(error.message);
});