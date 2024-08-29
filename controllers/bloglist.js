const blogRouter = require('express').Router()
const Blog = require('../models/blog')




blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  
 /*  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    }) */
})

blogRouter.post('/', (request, response) => {
  const body = request.body
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  })
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
