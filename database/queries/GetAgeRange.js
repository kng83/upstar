const Artist = require('../models/artist');



/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 * Robimy tu dane eksportowane do slidera by byl zakres wieku do sortowania
 * min and max
 */
module.exports = () => {


      const minQuery =  Artist
          .find({})
          .sort({age:1})
          .limit(1)
          .then((artist)=> {
            return artist[0].age; //nastepeny .then odnosilby sie juz tylko do minimalnego rekordu .then(minAge=>
      });

      const maxQuery = Artist
          .find({})
          .sort({age:-1})
          .then((artist)=>{
            return artist[0].age;
    });

      return Promise
          .all([minQuery,maxQuery])
          .then((result)=>{
            return {min:result[0], max:result[1]};
          });
};

//Poor approach because everything is back to node
// return new Promise((resolve) => {
//     Artist.find({}).sort({age:1}).then((artist)=>{
//         let minimal = artist[0].age;
//         let maximal = artist[artist.length-1].age;
//         console.log(artist);
//         resolve({min:minimal, max:maximal});
//     });
// });