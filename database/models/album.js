const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title:String,
    date:Date,
    copiesSold:Number,
    numberTracks:Number,
    image:String,
    revenue:Number

});

/*Dla subdokumentow exportujemy tylko schemat*/
module.exports = AlbumSchema;