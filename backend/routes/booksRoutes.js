import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

router.post('/', async (request, response) => {
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

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({ count: books.length, data: books });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/:id', async (request, response) => {
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

router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "All fields are required" });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body, { new: true });
        if (!result) {
            return response.status(404).json({ message: "There is no data with that ID" });
        }
        return response.status(200).json({ message: "Book updated successfully!", data: result });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: "No book found with that ID" });
        }
        return response.status(200).json({ message: "Book deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;  