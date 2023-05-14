const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');

const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //url'deki datayı okumamızı sağlıyor
app.use(express.json()); //url'deki datayı json formatına dönüştürüyor

//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  console.log(photos);
  res.render('index', {
    photos: photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/');
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`${PORT} portunda çalışıyor. `);
});
