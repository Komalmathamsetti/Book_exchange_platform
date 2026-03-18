const pool = require("../db");

exports.getNotifications = async (req, res) => {
  try {

    const user_id = req.params.user_id;

    const result = await pool.query(
      `SELECT * FROM notifications
       WHERE user_id=$1
       ORDER BY created_at DESC`,
      [user_id]
    );

    return res.json(result.rows);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
exports.getUnreadCount = async (req, res) => {
  try {

    const user_id = req.params.user_id;

    const result = await pool.query(
      `SELECT COUNT(*) FROM notifications
       WHERE user_id=$1 AND is_read=false`,
      [user_id]
    );

    return res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};


exports.markAsRead = async (req, res) => {
  try {

    const id = req.params.id;

    await pool.query(
      `UPDATE notifications
       SET is_read=true
       WHERE id=$1`,
      [id]
    );

    return res.json({
      message: "Notification marked as read"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};