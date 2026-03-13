const express = require("express");
const router = express.Router();
const {addBook,getBook,deleteBook} = require("../controllers/bookcontroller");
router.post("/",addBook);
router.get("/",getBook);
router.delete("/:id",deleteBook);
module.exports = router;