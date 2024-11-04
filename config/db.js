const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to the database with error handling
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

// Function to load messages from the database
async function loadMessages() {
  try {
    const result = await db.query("SELECT * FROM messages");
    const messages = result.rows.map((message) => message);
    return messages;
  } catch (error) {
    console.error("Error loading messages:", error);
    throw error;
  }
}

async function loadMessagebyID(id) {
  try {
    const result = await db.query("SELECT * FROM messages WHERE id = $1", [id]);
    const message = result.rows[0];
    return message;
  } catch (error) {
    console.error("Error loading message:", error);
    throw error;
  }
}

async function addMessages(message, username) {
  try {
    await db.query(
      "INSERT INTO messages (message, username, added) VALUES ($1, $2, NOW())",
      [message, username]
    );
  } catch (error) {
    console.error("Error adding messages:", error);
    throw error;
  }
}

module.exports = { db, loadMessages, addMessages, loadMessagebyID };
