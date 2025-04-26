const pool = require("./pool")

async function getAllMessages() {
  // sort it with later date on top!
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
  return rows;
}

async function insertNewMessage(username, text) {
  await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2)", [username, text]);
}

async function findMessage(id) {
  const { rows } = await pool.query("SELECT * from messages WHERE id = $1", [id])
  return rows[0];
}

// async function main() {
//   const rows = await getAllUsernames();
//   console.log(rows)
// }

// main()

module.exports = {
  getAllMessages,
  insertNewMessage,
  findMessage
}