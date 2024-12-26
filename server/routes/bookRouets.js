import { Router } from "express";
import * as bookController from "../controllers/bookController.js";

const router = Router();

router.get("/", bookController.getAllBooks);
router.post("/", bookController.addBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
// Get book details
router.get('/:id', bookController.getBookDetails);

// Get books by genre or author
router.get('/', bookController.getBooksByGenreOrAuthor);
export default router;
