const express = require("express");
const router = express.Router();
const {getNotifications,getUnreadCount,markAsRead} = require("../controllers/notification_controller");
router.get("/:user_id",getNotifications);
router.get("/unread/:user_id",getUnreadCount);
router.get("/read/:id",markAsRead);
module.exports = router;