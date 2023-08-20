const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'sql6.freesqldatabase.com', // MySQL server hostname
  user: 'sql6641164',      // MySQL username
  password: '4RUtg5sT1R', // MySQL password
  database: 'sql6641164'   // MySQL database name
};

let connection; // MySQL connection object

async function connect() {
  try {
    connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to MySQL');
    await createDatabase();
    await createTable();
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}

async function createTable() {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;

    await connection.query(createTableQuery);
    console.log('Table "Players" created successfully');

    connection.end(); // Close the connection
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

async function createDatabase() {
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`);
    console.log('Database created successfully');
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

async function insertData(data) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    data = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const insertQuery = 'INSERT INTO Players (name, email, password) VALUES (?, ?, ?)';
    const insertValues = [data.name, data.email, data.password];

    const [result] = await connection.query(insertQuery, insertValues);
    console.log('Data inserted successfully:', result);

    connection.end(); // Close the connection
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

async function getAllData() {
  try {
    const [rows] = await connection.query('SELECT * FROM Players');
    rows.forEach(row => {
      console.log(row);
    });
    return rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

async function getDocumentsByName(player_name) {
  try {
    const [rows] = await connection.query('SELECT * FROM Players WHERE name = ?', [player_name]);
    return rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

async function getDocumentsByEmailAndPassword(player_email, player_password) {
  try {
    const [rows] = await connection.query('SELECT * FROM Players WHERE email = ? AND password = ?', [player_email, player_password]);
    return rows;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

async function searchByEmail(email, password) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    const selectQuery = 'SELECT * FROM Players WHERE email = ? AND password = ?';
    const selectValues = [email, password];

    const [rows] = await connection.query(selectQuery, selectValues);

    connection.end(); // Close the connection

    if (rows.length === 0) {
      console.log('No data found for the provided email and password.');
      return null;
    } else {
      console.log('Data retrieved successfully:', rows);
      return rows;
    }
  } catch (error) {
    console.error('Error searching by email and password:', error);
    throw error; // Rethrow the error to be handled by the calling code
  }
}

module.exports = {
  connect,
  insertData,
  getAllData,
  getDocumentsByName,
  getDocumentsByEmailAndPassword,
  searchByEmail
};
