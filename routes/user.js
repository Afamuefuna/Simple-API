const express = require('express');

const {insertData} = require("../db")
const {getAllData} = require("../db")
const {getDocumentsByName} = require("../db")
const {getDocumentsByEmailAndPassword} = require("../db")
const {searchByEmail} = require("../db");


var router = express.Router();

const users = [{name: 'Tony', email: 'tony@gmail.com'}]

router.get('/',(req, res) => {
    res.send('Your app');
});

router.get('/users', async (req, res) => {
    try {
      const allDocs = await getAllData();
      res.json({ ok: true, allDocs });
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ ok: false, error: 'Failed to retrieve data' });
    }
  });

  router.post('/adduser', (req, res) => {
    const { name, email, firstName, lastName, gender, age, passWord } = req.body;

    // Check if all required fields are present in the request body
    if (name && email && firstName && lastName && gender && age && passWord) {
        // Call a function named "insertData" to insert the user data into a database
        const insertedUser = insertData(req.body);

        // Respond to the client with the inserted user's data in JSON format
        res.json({ ok: true, message: "Added", user: insertedUser });
    } else {
        // Respond to the client with an error message if required fields are missing
        res.status(400).json({ ok: false, message: "Missing required fields" });
    }
});


router.get('/users/:email/', async (req, res) => {
    console.log(req.params)
    const getDetail = await searchByEmail(req.params.email);
    res.json({ok: getDetail.length > 0, name: getDetail});
    
});

module.exports = router;
