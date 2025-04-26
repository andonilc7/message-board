require('dotenv').config();

const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS messages(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, message)
VALUES
  ('Amando', 'Hello there! How are you?'),
  ('Charles', 'Hello World!');
`;

async function main() {
  console.log("seeding...")
  const client = new Client({
    connectionString: process.env.DB_URL
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done!");
}

main();