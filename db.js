const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Simon:binaryHack123@cluster0.flnz0tx.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URI
const client = new MongoClient(uri);

const databaseName = "Main";
const collectionName = "Players";

async function connect() {
    try {
      await client.connect(); // Connect to MongoDB
      console.log('Connected to MongoDB');
      // Additional setup or operations can be performed here
      createDatabse(databaseName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async function createDatabse(name){
    try{
        const db = client.db(name);
        await db.createCollection('Players');
        console.log('Database created successfully')
    }catch(error){
        console.error('Error creating database: ' + error);
    }
  }

  async function insertData(data) {
    try {
      const database = client.db(databaseName); // Replace 'myDatabase' with the desired database name
      const collection = database.collection(collectionName); // Access the desired collection
  
      var result = await collection.insertOne(data); // Insert a single document

      console.log(result)

    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  async function getAllData() {
    try {
      const database = client.db(databaseName); // Replace 'myDatabase' with the desired database name
      const collection = database.collection(collectionName); // Access the desired collection
  
      const documents = await collection.find().toArray(); // Retrieve all documents
  
      documents.forEach(document => {
        console.log(document);
      });

      return documents;
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  async function getDocumentsByName(player_name) {
    try {
      const database = client.db(databaseName); // Replace 'myDatabase' with the desired database name
      const collection = database.collection(collectionName); // Access the desired collection

      const query = { name: player_name }; // Define the query to match documents with the specified name
      console.log(player_name);

      const documents = await collection.find(query).toArray(); // Retrieve documents matching the query

      return documents;

    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error; // Rethrow the error to be handled by the calling code
    }
  }

  async function getDocumentsByName(player_name) {
    try {
      const database = client.db(databaseName); // Replace 'myDatabase' with the desired database name
      const collection = database.collection(collectionName); // Access the desired collection

      const query = { name: player_name }; // Define the query to match documents with the specified name
      console.log(player_name);

      const documents = await collection.find(query).toArray(); // Retrieve documents matching the query

      return documents;

    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error; // Rethrow the error to be handled by the calling code
    }
  }

  async function getDocumentsByEmailAndPassword(player_email, player_password) {
      try {
      const database = client.db(databaseName); // Replace 'myDatabase' with the desired database name
      const collection = database.collection(collectionName); // Access the desired collection

      const query = {
        email: player_email,
        password: player_password
      };

      const documents = await collection.find(query).toArray(); // Retrieve documents matching the query

      return documents;

    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error; // Rethrow the error to be handled by the calling code
    }
  }

  module.exports = {connect,
    insertData,
    getAllData,
    getDocumentsByName,
    getDocumentsByEmailAndPassword};