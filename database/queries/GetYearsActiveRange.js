const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 * Robimy tu dane eksportowane do slidera by byl zakres wieku do sortowania
 * min and max
 */
module.exports = () => {
    return new Promise((resolve) => {
        let minimal;
        let maximal;
        Artist.find({}).sort({yearsActive:1}).limit(1).then((artist)=>{
            minimal = artist[0].yearsActive;
            Artist.find({}).sort({yearsActive:-1}).limit(1).then((artist)=>{
                maximal= artist[0].yearsActive;
                resolve({min:minimal, max:maximal})
            });
        });
    });
};
