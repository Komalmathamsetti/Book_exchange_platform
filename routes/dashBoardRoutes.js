const express =require("express");
const router = express.Router();
const{getMyBooks,getMyRequests,getRequestsForMyBook,getBookingHistory} = require("../controllers/dashBoard_controller");
router.get("/my-books/:user_id",getMyBooks);
router.get("/my-requests/:user_id",getMyRequests);
router.get("/book-requests/:user_id",getRequestsForMyBook);
router.get("/my-history/:user_id",getBookingHistory);
module.exports = router;