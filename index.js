const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/", (req, res) => {
  console.log("Node server is running");
  res.send("Node server is running");
});

//Connecting to Database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lywwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const cartCollection = client.db("mealCollection").collection("cart");
    const foodCollection = client.db("mealCollection").collection("foods");
    //Load Breakfast API
    app.get("/breakfasts", async (req, res) => {
      const query = { catagory: "breakfast" };
      const cursor = foodCollection.find(query);
      const breakfasts = await cursor.toArray();
      res.send(breakfasts);
    });

    app.get("/lunches", async (req, res) => {
      const query = { catagory: "lunch" };
      const cursor2 = foodCollection.find(query);
      const lunches = await cursor2.toArray();
      res.send(lunches);
    });
    app.get("/dinners", async (req, res) => {
      const query = { catagory: "dinner" };
      const cursor3 = foodCollection.find(query);
      const dinners = await cursor3.toArray();
      res.send(dinners);
    });

    //Add Breakfast
    app.post("/additems", async (req, res) => {
      const newBreakfast = req.body;
      const result = await breakfastCollection.insertOne(newBreakfast);
      res.send(result);
    });

    //Delete Items
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await breakfastCollection.deleteOne(query);
      res.send(result);
    });
    //Adding to cart
    app.post("/cart/:email", async (req, res) => {
      const email = req.body.email;
      const item = req.body;
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running");
});
