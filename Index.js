
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretTicket = 'shhh'
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
const app = express();


//middlewire

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.pbmjp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/', (req, res) => {
    res.send('todo server running')
  });
  
  app.listen(port, () => {
    console.log('listening', port);
  });