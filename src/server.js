const express = require("express");
app = express();

const mongoose = require("mongoose");
const Note = require("./models/Note");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://dhruvumesh12a:hello123@cluster0.4nwkr05.mongodb.net/test"
  )
  .then(function () {
    app.get("/", function (req, res) {
      res.send("This is the home page");
    });

    app.get("/notes/list", async function (req, res) {
      var notes = await Note.find();
      res.json(notes);
      // res.send("This are the notes");
    });
    app.post("/notes/list", async function (req, res) {
      var notes = await Note.find({ userid: req.body.userid });
      res.json(notes);
      // res.send("This are the notes");
    });

    app.post("/notes/add", async function (req, res) {
      // res.json(req.body.id);
      await Note.deleteOne({ id: req.body.id });
      const newNotes = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.id,
        //   id: ṛeq.body.id,
        //   userid: "ṛeq.body.userid",
        //   title: "ṛeq.body.title",
        //   content: "ṛeq.body.content",
      });
      await newNotes.save();
      const response = { message: "New Note Created!!" + `id ${req.body.id}` };
      res.json(response);
    });

    app.post("/notes/delete", async function (req, res) {
      await Note.deleteOne({ id: req.body.id });
      const response = { message: "Note Deleted !!" + `id ${req.body.id}` };
      res.json(response);
    });
  });

app.listen(5000, function () {
  console.log("server Started at PORT : 5000");
});
