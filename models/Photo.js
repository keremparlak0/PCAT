const  mongoose = require("mongoose");
const Schema = mongoose.Schema;


// CreateSchema
const PhotoShema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Photo = mongoose.model('Photo', PhotoShema);

module.exports = Photo;