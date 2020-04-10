const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/clouddraw', {
  useNewUrlParser: true
});




const artistSchema = new mongoose.Schema({
  artist: String,
  bio: String
});

// Create a model for items in the museum.
const Artist = mongoose.model('Artist', artistSchema);


const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  artist: String,
  desc: String
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);





app.post('/api/artists', async (req, res) => {
  const artist = new Artist({
    artist: req.body.artist,
    bio: req.body.bio
  });
  try {
    await artist.save();
    res.send(artist);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/artists', async (req, res) => {
  try {
    let artists = await Artist.find();
    res.send(artists);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/artists/:id', async (req, res) => {
  try {
    let artist = await Artist.findOne({
      _id: req.params.id
    });
    res.send(artist);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/artists/:id', async (req, res) => {
  try {
    await Artist.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/artists/:id', async (req, res) => {
  try {
    let artist = await Artist.findOne({
      _id: req.params.id
    });
    artist.artist = req.body.artist;
    artist.bio = req.body.bio;
    artist.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
















// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    artist: req.body.artist,
    desc: req.body.desc
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  };
});


// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.artist = req.body.artist;
    item.desc = req.body.desc;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
