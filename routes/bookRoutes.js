const express = require("express");
const router = express.Router();
const {addBook,getBooks,deleteBook,getBookById,updateBook} = require("../controllers/bookcontroller");
router.get("/", getBooks);
router.get("/:id",getBookById);
router.post("/",addBook);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);
module.exports = router;