const express = require('express');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override'); //Post requesti put request gibi simüle edecek paket
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
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
app.use(express.urlencoded({ extended: true })); //url'deki datayı okumamızı sağlıyor
app.use(express.json()); //url'deki datayı json formatına dönüştürüyor
app.use(fileUpload());
app.use(methodOverride('_method', {
  methods:['POST', 'GET']
}));

//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos: photos,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uplodedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uplodedImage.name;

  uplodedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uplodedImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo: photo,
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id});
  res.render('edit', {
    photo: photo
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id});
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`)
});

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id});
  let deletedImage = __dirname + '/public' + photo.image
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`${PORT} portunda çalışıyor. `);
});
