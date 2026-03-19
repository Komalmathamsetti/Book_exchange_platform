const express = require("express");
const router = express.Router();
const {createExchangeRequest,getAllRequests,updateExchangeRequest, deleteExchangeRequest} = require("../controllers/exchange_controller");
router.post("/",createExchangeRequest);
router.get("/",getAllRequests);
router.put("/:id",updateExchangeRequest);
router.delete("/:id",deleteExchangeRequest);
module.exports = router;