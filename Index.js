
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


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.q6imm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
  
      await client.connect()

      const tasksCollection = client.db('todo-list').collection('todos')
      const completedTasksCollection = client.db('todo-list').collection('completedTasks')


      app.get('/alltasks', async (req, res) => {
        const query = {}
        const cursor = tasksCollection.find(query)
        const allTasks = await cursor.toArray()
        res.send(allTasks)
      })
  
      app.get('/completed-tasks', async (req, res) => {
        const query = {}
        const cursor = completedTasksCollection.find(query)
        const completedTasks = await cursor.toArray()
        res.send(completedTasks)
      })
  
      app.post('/task', async (req, res) => {
        const task = req.body;
        const result = await tasksCollection.insertOne(task);
        res.send(result)
      })
      app.post('/completed-task', async (req, res) => {
        const task = req.body
        const result = await completedTasksCollection.insertOne(task);
        res.send(result)
      })


      app.put('/edited-task/:id', async(req, res) =>{
        const id = req.params.id;
        const task = req.body?.val;
        const filter = {_id: ObjectId(id)};
        const updatedDoc = {
            $set: {
              task: task
            }
        };
        const result = await ordersCollection.updateOne(filter, updatedDoc);
        res.send(result);
      
      })

      

    }
    finally {
  
    }
  
  }
  
  run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('todo server running')
  });
  
  app.listen(port, () => {
    console.log('listening', port);
  });