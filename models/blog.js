const mongoose = require('mongoose')
const Comments = require('./comments')

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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
})

module.exports = mongoose.model('Blog', blog)