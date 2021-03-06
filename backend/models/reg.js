const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
   
    university: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    
    status: {
        type: String, 
        default: "pending"
    }
});

const details = mongoose.model('admindetail', detailSchema);

module.exports = details;