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
exports.deleteBook = async(req,res)=>{
    try{
        const id = req.params.id;
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
            `UPDATE books
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
exports.getBooks = async(req,res)=>{
    try{
        let { search, subject, condition, sort, page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1)*limit;
        let query = `SELECT * FROM books WHERE status = 'AVAILABLE'`;
        let values = [];
        let index = 1;
        if(search){
            query += ` AND (title ILIKE $${index} OR author ILIKE $${index})`;
            values.push(`%${search}%`);
            index++;
        }
        if(subject){
            query += ` AND subject = $${index}`;
            values.push(subject);
            index++;
        }
        if(condition){
            query += ` AND condition = $${index}`;
            values.push(condition);
            index++;
        }
        if(sort == "latest"){
            query += ` ORDER BY created_at DESC`;
        }else{
            query += ` ORDER BY created_at ASC`;
        }
        query += ` LIMIT $${index} OFFSET $${index+1}`;
        values.push(limit,offset);
        const result = await pool.query(query,values);
        return res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};