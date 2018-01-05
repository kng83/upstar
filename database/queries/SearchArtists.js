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


    const query = Artist.find(buildQuery(criteria))
        .sort({[sortProperty]:1}) //to jest es6 interpolated keys dzieki temu latwo mozna przekazac wlasciwosci obiektu
        .skip(offset)
        .limit(limit);

    return Promise.all([query,Artist.count()]) //count jest zwracana z obiektu przez moongoose
        .then((results)=>{
            return{
                all:results[0],
                count:results[1],
                offset:offset,
                limit:limit
            };
        });
};

const buildQuery = (criteria) =>{

    const query ={};

    //aby mozna bylo pracowac na tekst indeksie ktory jest szybki musimy wejsc do bazy danych
    //przez konsole
    //piszemy use upstar_music
    //show dbs --pokazuje bazy danych
    //aby dodac indeks do pola to
    //db.artists.createIndex({name:"text"})

    //Ta wersja szuka calego slowa
    // if(criteria.name){
    //     query.$text = { //aby wyszukac specyficzny kawalek tekstu
    //         $search:criteria.name
    //     }
    // }

    //Wersja z  regex wydaje sie lepsza
        if (criteria.name) {
        query.name = {
            $regex: criteria.name,
            $options: "i"
        }
    }
    if(criteria.age){
        query.age ={
            $gte: criteria.age.min,
            $lte: criteria.age.max
        };
    }
    if(criteria.yearsActive){
        query.yearsActive ={
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        };
    }


    return query;
};

/*Moja dzialajaca wersja do sekcji 13 wyklad 87*/
// module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
//     console.log(criteria);
//     let queryObj={};
//     if(criteria['yearsActive'] !==null && criteria['yearsActive'] !== undefined){
//         queryObj['yearsActive'] = {$gt:criteria['yearsActive']['min'],$lt:criteria['yearsActive']['max']}
//     }
//     if(criteria['age'] !==null && criteria['age'] !== undefined){
//         queryObj['age'] = {$gt:criteria['age']['min'],$lt:criteria['age']['max']}
//     }
//     if(criteria['name'] ===''){
//
//     }else{
//         queryObj['name']=criteria['name']
//    }
//
//
//     console.log(queryObj);
//
//     const query = Artist.find(queryObj)
//         .sort({[sortProperty]:1}) //to jest es6 interpolated keys dzieki temu latwo mozna przekazac wlasciwosci obiektu
//         .skip(offset)
//         .limit(limit);
//
//     return Promise.all([query,Artist.count()]) //count jest zwracana z obiektu przez moongoose
//         .then((results)=>{
//             return{
//                 all:results[0],
//                 count:results[1],
//                 offset:offset,
//                 limit:limit
//             };
//         });
// };

/*Moje dzialajace polecenie*/
// module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
//
//     let sortObj= {name:1};
//     let count =5;
//
//     switch(sortProperty){
//         case 'name':{
//             sortObj = {name:1};
//         }
//         break;
//         case 'age':{
//             sortObj ={age:1};
//         }
//         break;
//         case 'albums':{
//             sortObj = {albums:-1};
//
//         }
//         break;
//         default:
//             break;
//     }
//
// return new Promise((resolve) => {
//      Artist.find({}).sort(sortObj).then((artist)=>{
//
//         let output=[];
//         for (let i=0; i<artist.length;i++){
//             output.push(artist[i]._doc);
//         }
//         return output;
//
//     }).then((artistSort)=>{
//         resolve({all:artistSort,count:artistSort.length,offset:offset,limit:limit});
//     });
// });
//
// };
