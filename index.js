const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n7zit.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        await client.connect();
        const tuitionsCollection = client.db("tuition-e").collection("all-tuitions");
        const tutorsCollection = client.db("tuition-e").collection("all-tutors");

        app.get('/all-tuitions', async (req, res) => {
            const query = {};
            const cursor = tuitionsCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })
        app.get('/all-tutors', async (req, res) => {
            const query = {};
            const cursor = tutorsCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        })

    }
    finally {
        // await client.close();

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello Tutors!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})