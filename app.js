const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // modülü kullanıma alıyoruz.
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const dbURI =
  'mongodb+srv://Zeyneptilbe:test1234@cluster1.4hzpo.mongodb.net/pcat-test-db';

const app = express();

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

//Template Engine
app.set('view engine', 'ejs');
//Middlewares
app.use(express.static('public'));
//aldığımız requesti sonlandırmamıza yardımcı oldurlar.
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //url'de ki datayı jsona dönüştürür.
app.use(fileUpload()); // middleware olarak kaydediyoruz.
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//  routes
//Tüm fotoğrafları İndex template'ine gönderir.
app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);
//yeni fotoğraf oluştururken
app.post('/photos', photoController.createPhoto);
//put request, fotoğraf update eder.
app.put('/photos/:id', photoController.updatePhoto);

app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
