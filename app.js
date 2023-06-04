const express = require('express');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override'); //Post requesti put request gibi simüle edecek paket
const ejs = require('ejs');
const mongoose = require('mongoose');
const photoController = require('./controlers/photoControllers');
const pageController = require('./controlers/pageControllers');

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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos');
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`${PORT} portunda çalışıyor. `);
});
