const pool = require("../db");
exports.getMyBooks = async(req,res)=>{
    try{
        const user_id = req.params.user_id;
        const result = await pool.query(`SELECT * FROM books WHERE owner_id = $1 ORDER BY id DESC`,[user_id]);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.getMyRequests = async(req,res)=>{
    try{
        const user_id = req.params.user_id;
        const result = await pool.query(
            `SELECT exchange_requests.*,books.title
             FROM exchange_requests
             JOIN books ON books.id = exchange_requests.book_id
             WHERE requester_id = $1
             ORDER BY requested_at DESC`,[user_id]);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.getRequestsForMyBook = async(req,res)=>{
    try{
        const user_id = req.params.user_id;
        const result = await pool.query(
            `SELECT exchange_requests.*,books.title
            FROM exchange_requests
            JOIN books ON books.id = exchange_requests.book_id
            WHERE owner_id=$1
            ORDER BY requested_at DESC`,[user_id]
        );
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.getBookingHistory = async(req,res)=>{
    try{
        const user_id = req.params.user_id;
        const result = await pool.query(
            `SELECT exchange_requests.*,books.title
            FROM exchange_requests
            JOIN books ON books.id = exchange_requests.book_id
            WHERE (books.owner_id = $1 OR requester_id = $1)
            AND exchange_requests.status = 'ACCEPTED'
            ORDER BY requested_at DESC`,[user_id]
        );
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};