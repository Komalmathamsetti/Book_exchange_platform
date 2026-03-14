const express = require("express");
const router = express.Router();
const {addBook,getBook,deleteBook,getBookById,updateBook} = require("../controllers/bookcontroller");
router.post("/",addBook);
router.get("/",getBook);
router.get("/:id",getBookById);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);
module.exports = router;