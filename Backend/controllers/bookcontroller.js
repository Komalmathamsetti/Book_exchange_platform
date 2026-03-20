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
exports.getRecommendedBooks = async (req, res) => {
  try {

    const user_id = req.params.user_id;

    // 1️⃣ get user interest
    const userInterest = await pool.query(
      `SELECT subject
       FROM books 
       WHERE owner_id = $1
       GROUP BY subject
       ORDER BY COUNT(*) DESC
       LIMIT 1`,
      [user_id]
    );

    // 2️⃣ if no interest → fallback
    if (userInterest.rows.length === 0) {
      const fallback = await pool.query(
        `SELECT * FROM books
         WHERE status = 'AVAILABLE'
         ORDER BY created_at DESC
         LIMIT 5`
      );

      return res.json({
        type: "fallback",
        books: fallback.rows
      });
    }

    const subject = userInterest.rows[0].subject;

    // 3️⃣ try personalized
    const result = await pool.query(
      `SELECT * FROM books
       WHERE subject = $1
       AND owner_id != $2
       AND status = 'AVAILABLE'
       ORDER BY created_at DESC
       LIMIT 5`,
      [subject, user_id]
    );

    // 4️⃣ if no matching books → fallback
    if (result.rows.length === 0) {
      const fallback = await pool.query(
        `SELECT * FROM books
         WHERE owner_id != $1
         AND status = 'AVAILABLE'
         ORDER BY created_at DESC
         LIMIT 5`,
        [user_id]
      );

      return res.json({
        type: "fallback_no_match",
        message: "No similar books found",
        books: fallback.rows
      });
    }

    // 5️⃣ return personalized
    return res.json({
      type: "personalized",
      subject,
      books: result.rows
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};