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