const Artist = require('../models/artist');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {
    //let artist = new Artist({_id:_id});
    //return artist.remove(_id);
   // return Artist.findOneAndRemove({_id:_id});
    return Artist.remove({_id}); //equal to ({_id:_id}) skladnia es6
};
