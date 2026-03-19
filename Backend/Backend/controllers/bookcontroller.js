const pool = require("../db");
exports.addBook = async(req,res)=>{
    try{
        const {owner_id,title,author,subject,condition} = req.body;
        const result = await pool.query(
            "INSERT INTO books (owner_id,title,author,subject,condition) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            [owner_id,title,author,subject,condition],
        );
        res.json({
            message: "Book added Successfully",
            book: result.rows[0],
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.getBook = async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM books");
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.deleteBook = async(req,res)=>{
    try{
        const [id] = req.params.id;
        await pool.query("DELETE FROM books WHERE id = $1",[id]);
        res.json({
            message: "Book deleted successfully",
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.getBookById = async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await pool.query("SELECT * FROM books WHERE id = $1",[id]);
        if(result.rows.length === 0){
           return res.status(404).json({message: "Book not found"});
        }
        res.json(result.rows[0]);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.updateBook = async(req,res)=>{
    try{
        const id = req.params.id;
        const {title,author,subject,condition} = req.body;
        const result = await pool.query(
            `UPDATE book
            SET title = $1,author = $2,subject=$3,condition=$4
            WHERE id=$5
            RETURNING *`,[title,author,subject,condition,id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message: "Book not found"});
        }
        res.json(result.rows[0]);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.searchBook = async(req,res)=>{
    try{
        const {title} = req.query;
        const result = await pool.query("SELECT * FROM books WHERE title ILIKE $1",[`%${title}%`]);
        if(result.rows.length === 0){
            return res.status(404).json({message: "Book not found"});
        }
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.filterBook = async (req, res) => {
  try {

    const { subject, condition } = req.query;

    const result = await pool.query(
      "SELECT * FROM books WHERE subject = $1 OR condition = $2",
      [subject, condition]
    );
    if(result.rows.length === 0){
        return res.status(404).json({message: "Book not found"});
    }
    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.pagination = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit)|| 5;
        const offset = (page-1)*limit;
        const result = await pool.query("SELECT * FROM books LIMIT $1 OFFSET $2",[limit,offset]);
        if(result.rows.length === 0){
            return res.status(404).json({message: "Book not found"});
        }
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.sortBooks = async(req,res)=>{
    try{
        const {order} = req.query;
        const sortOrder = order === "desc"?"DESC":"ASC";
        const result = await pool.query(`SELECT * FROM books ORDER BY title ${sortOrder}`);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};