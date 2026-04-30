const pool = require("../db");

// 📚 My Books
exports.getMyBooks = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const result = await pool.query(
      `SELECT * FROM books 
       WHERE owner_id = $1 
       ORDER BY id DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// 📥 My Requests (I requested)
exports.getMyRequests = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const result = await pool.query(
      `SELECT exchange_requests.*, books.title
       FROM exchange_requests
       JOIN books ON books.id = exchange_requests.book_id
       WHERE exchange_requests.requester_id = $1
       ORDER BY exchange_requests.requested_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// 📤 Requests for My Books (MOST IMPORTANT)
exports.getRequestsForMyBook = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const result = await pool.query(
      `SELECT exchange_requests.*, books.title
       FROM exchange_requests
       JOIN books ON books.id = exchange_requests.book_id
       WHERE books.owner_id = $1   -- ✅ FIXED
       ORDER BY exchange_requests.requested_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// 📜 Booking History
exports.getBookingHistory = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const result = await pool.query(
      `SELECT exchange_requests.*, books.title
       FROM exchange_requests
       JOIN books ON books.id = exchange_requests.book_id
       WHERE (books.owner_id = $1 OR exchange_requests.requester_id = $1)
       AND exchange_requests.status = 'ACCEPTED'
       ORDER BY exchange_requests.requested_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};