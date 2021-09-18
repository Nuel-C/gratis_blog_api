const mongoose = require('mongoose')

//comment schema
const comment = new mongoose.Schema({
    name: {
        type: String
    },
    comment: {
        type: String
    },
})

module.exports = mongoose.model('Comment', comment)