const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyww9ng.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const mobileCollection = client.db('mobiles').collection('mobile')

    // app.post('/postToy', async (req, res) => {
    //   const body = req.body;
    //   const result = await toysCollection.insertOne(body);
    //   res.send(result)
    //   console.log(body);
    // })

   


    app.get('/mobiles', async (req, res) => {
      const cursor = mobileCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

  



//     app.post('/toyDetails/:id', async (req, res) => {
//       const toy = await toysCollection.findOne({ _id: new ObjectId(req.params.id) });

//       res.send(toy);
//   });

//   app.get('/toyDetails/:id', async (req, res) => {
//       const toy = await toysCollection.findOne({ _id: new ObjectId(req.params.id) });

     
//       res.send(toy);
//   });
  
  


 
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Phone is running');
})
app.listen(port, () => {
  console.log(`Phone is running on port ${port}`);
})