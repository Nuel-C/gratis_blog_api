const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const path = require('path')
const Blog = require('./models/blog')
const Comments = require('./models/comments')



//Connect to DB
// mongoose.connect('mongodb+srv://Nuel:chuks@cluster0.ldv66.mongodb.net/gratis_blog?retryWrites=true&w=majority', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/gratis', {useNewUrlParser: true, useUnifiedTopology: true})


//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

//Rouutes

//Get all blog posts
app.get('/getAllBlogs', (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if(err){
            res.send(err)
        }else if(blogs){
            res.send(blogs)
        }else{
            return null
        }
    })
})

//Get post by id
app.post('/findById', (req, res)=>{
    Blog.findById({_id: req.body.id}, (err, blog)=>{
        if(err){
            res.send(err)
        }else if(blog){
            res.send(blog)
        }else{
            return null
        }
    })
    
})

//Create blog
app.post('/createBlog', (req, res)=>{
    const newBlog = new Blog({
        title: req.body.title, 
        author: req.body.author, 
        blog :req.body.blog
    })

    newBlog.save((err, blog)=>{
        if(err){
            res.send(err)
        }else if(blog){
            res.send(blog)
        }else{
            return null
        }
    })
        
})

//Get blog posts with pagination
app.get('/paginatedBlogPosts', (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if(err){
            res.send(err)
        }else if(blogs){
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}


            if(endIndex < blogs.length){
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if(startIndex > 0){
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            results.results = blogs.slice(startIndex, endIndex)

            res.json(results)
        }else{
            return null
        }
    })


    
})

//Delete all blogs
app.post('/deleteAll', (req,res)=>{
    Blog.deleteMany({}, (err, blogs)=>{
        if(err){
            res.send(err)
        }else if(blogs){
            res.send(blogs)
        }else{
            return null
        }
    })
})

//Update Blog
app.put('/updateBlog', (req, res) => {
    Blog.findByIdAndUpdate(req.body.id, {title: req.body.title, blog: req.body.blog}, (err, blog)=>{
        if(err){
            res.send(err)
        }else if(blog){
            Blog.findById(req.body.id, (err, newBlog)=>{
                res.json(newBlog)
            })
        }else{
            return null
        }
    })
});

//Delete Blog
app.delete('/deleteBlog', (req, res) => {
    Blog.findByIdAndDelete(req.body.id, (err, blog)=>{
        if(err){
            res.send(err)
        }else if(blog){
            res.json(blog)
        }else{
            return null
        }
    })
});

//Add a comment to a blog
app.put('/addComment', (req, res) => {
    Blog.findById(req.body.id, (err, blog)=>{
        if(err){
            res.send(err)
        }else if(blog){
            Comments.create({name: req.body.name, comment: req.body.comment}, (err, comment)=>{
                if(err){
                    res.send(err)
                }else if(comment){
                    blog.comments.push(comment) 
                    blog.save()
                    res.json(blog)
                }else {
                    return null
                }
            })   
        }else{
            return null
        }
    })
});

//Invalid route
app.get('*', (req, res)=>{
    res.redirect('/')
})

//Start server
app.listen(process.env.PORT || 5000, ()=>{
    console.log('Api Running')
})