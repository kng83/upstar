const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this: {all:[artists], count:count, offset:offset, limit: limit}
 * Write a query that will sort, offset, limit options only
 * don't worry about criteria yet
 * sortby jest na dole 2.14 (czyli sort by age, name lub album released
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

    let sortObj= {name:1};
    let count =5;

    switch(sortProperty){
        case 'name':{
            sortObj = {name:1};
        }
        break;
        case 'age':{
            sortObj ={age:1};
        }
        break;
        case 'albums':{
            sortObj = {albums:-1};

        }
        break;
        default:
            break;
    }

return new Promise((resolve) => {
     Artist.find({}).sort(sortObj).then((artist)=>{

        let output=[];
        for (let i=0; i<artist.length;i++){
            output.push(artist[i]._doc);
        }
        return output;

    }).then((artistSort)=>{
        resolve({all:artistSort,count:artistSort.length,offset:offset,limit:limit});
    });
});

};
