const mongoose = require('mongoose')

//blog schema
const blog = new mongoose.Schema({
    title: {
        type: String
    },
    blog: {
        type: String
    },
    author: {
        type: String
    },
    comments: {
        type: Array
    }
})

module.exports = mongoose.model('Blog', blog)