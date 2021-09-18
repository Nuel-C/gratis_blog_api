const mongoose = require('mongoose')

//comments schema
const comment = new mongoose.Schema({
    name: {
        type: String
    },
    commment: {
        type: String
    },
})

module.exports = mongoose.model('Comment', comment)