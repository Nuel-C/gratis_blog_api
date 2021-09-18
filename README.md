# gratis_blog_api
a basic REST API for a blog

#How to set up and start the app

. clone the repository and then run "npm install" to install dependencies from package.json then run "npm start" in the terminal of the project directory (you should already have node js installes on your machine)

#Link to hosted api

. https://gratis-blog-api.herokuapp.com

#Tools used

. node package manager


#Note

All requests are to be sent in json format via postman or any frontend application that can connect to the api. All request parameters can be found in the blog schema, comment schema and routes processing api requests e.g in req.body.commentIndex, commentIndex is the json key for api query. When searching by id use mongodb ids.