//schema of project
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
    
    title:{
        type: String,
        required : true,
    },
    author:{  
        type: String,
        required : true,
    },
    imageurl:{
        type: String,
        required : true,
    },
    price:{
        type: String,
        required : true,
    },
        featured:{
        type: String,
        
    }
    },
{
        collection:'books'

});
//module exporting
module.exports = mongoose.model('Book', Book);