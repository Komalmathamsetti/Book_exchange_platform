const pool = require("../db");
exports.createExchangeRequest = async(req,res)=>{
    try{
        const {book_id,requester_id} = req.body;
        const book = await pool.query(`SELECT * FROM books WHERE id = $1`,[book_id]);
        if(book.rows.length === 0){
            return res.status(404).json({message: "Book not found"});
        }
        if(book.rows[0].status === "EXCHANGED"){
            return res.status(404).json({message: "Book already exchanged"});
        }
        const exisitingRequest = await pool.query(`SELECT * FROM exchange_requests WHERE book_id = $1 AND requester_id = $2`,[book_id,requester_id]);
        if(exisitingRequest.rows.length>0){
           return res.status(400).json({message: "You already requested this book"});
        }
        const result = await pool.query(`INSERT INTO exchange_requests (book_id,requester_id) VALUES ($1,$2) RETURNING *`,[book_id,requester_id]);
        await pool.query(`INSERT INTO notifications (user_id,message) VALUES ($1,$2)`,[book.rows[0].owner_id,"Someone requested your book"]);
        return res.json({
            message: "Exchange request created successfully",
            request: result.rows[0],
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.getAllRequests = async(req,res)=>{
    try{
        const result = await pool.query(`SELECT * FROM exchange_requests`);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.updateExchangeRequest = async(req,res)=>{
    try{
        const id = req.params.id;
        const {status} = req.body;
        const request = await pool.query(`SELECT * FROM exchange_requests WHERE id = $1`,[id]);
        if(request.rows.length === 0){
            return res.status(404).json({message: "Request not found"});
        }
        const book_id = request.rows[0].book_id;
        const result = await pool.query(`UPDATE exchange_requests SET status=$1 WHERE id = $2 RETURNING *`,[status,id]);
        if(status === "ACCEPTED"){
            await pool.query(`UPDATE books SET status = 'EXCHANGED' WHERE id = $1`,[book_id]);
            await pool.query(`UPDATE exchange_requests SET status='REJECTED' WHERE book_id = $1 AND id<>$2`,[book_id,id]); 
        }
        res.json({message: "Request updated successfully",
            request: result.rows[0],       
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.deleteExchangeRequest = async(req,res)=>{
    try{
       const id = req.params.id;
       await pool.query(`DELETE FROM exchange_requests WHERE id = $1`,[id]);
       res.json({message: "Exchange request deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};