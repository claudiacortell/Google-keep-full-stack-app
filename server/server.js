const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser'); // middleware making object 
const {MongoClient} = require('mongodb');
const ObjectId = require("mongodb").ObjectId;

app.use(cors()); // middleware 
app.use(bodyParser.json());
const uri = "mongodb+srv://ccc2223:9OtkSiL4xFpzwv8f@s23-coms4111.5lzsk7g.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri); // creating instance 
const db = client.db("web_dev_final_project"); // referrencing db

async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        app.listen(5000,()=>{console.log("server started on port 5000")});
 
    } catch (e) {
        console.error(e);
    }
}

app.get("/api", async (req, res) =>{
    const data = await db.collection("notes").find().toArray();
    res.send(data);
});

app.post("/api/postData", async (req, res) => {
    console.log("post req received");
    const data = req?.body;

    const result = await db.collection("notes").insertOne(data);
    res.send(result);
})

app.delete("/api/deleteData", async (req, res) => {
    console.log("delete req received");
    const { id } = req.body;
   
    const result = await db.collection("notes").deleteOne({_id: new ObjectId(id)});
    res.send(result);
})

main().catch(console.error);