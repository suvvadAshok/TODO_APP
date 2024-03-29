const Express = require("express");
const Mongoclient = require("mongodb").MongoClient;
const cors = require("cors");

const app = Express();
app.use(cors());
app.use(Express.json());

const CONNECTION_STRING =
  "mongodb+srv://ashok:ashok@cluster2.pyrxxed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";

const DATABASENAME = "sampletodo";
let database;

app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log("connection success");
  });
});

app.get("/api/todoapp/getnotes", (request, response) => {
  database
    .collection("sampletodocollection")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.post("/api/todoapp/addnotes", (req, res) => {
  database.collection("sampletodocollection").count({}, (error, numOfDocs) => {
    database.collection("sampletodocollection").insert({
      id: (Number(numOfDocs) + 1).toString(),
      description: req.body.newNotes,
    });
    res.json("added notes Succesfully");
  });
});

app.delete("/api/todoapp/deletenotes", (request, response) => {
  database.collection("sampletodocollection").delete({
    id: request.query.id,
  });
  response.json("delete succesfully");
});
