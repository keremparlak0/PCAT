const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Create a photo
/* Photo.create({
    title: "Photo title 2",
    description: "Photo desc. 2"
});*/

// Read a photo
const read = async () => {
    try {
        const data = await Photo.find({});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
read(); // HEPSİ DÜZENLENİP DENENECEK

// Update a photo
// const id = '645ad3119298dae0f879fd1a';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Update',
//     description: 'update desc',
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//update photo
// const id = '6079f04e5916c524d4bdcb74';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 111 updated',
//     description: 'Photo description 111 updated',
//   },
//   {
//       new: true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

//delete a photo
// const id = '6079f1ce8c0f602c98964346';

// Photo.findByIdAndDelete(id, (err, data) => {
//   console.log('Photo is removed..');
// });
