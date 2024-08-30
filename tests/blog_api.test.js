const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./blog_test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
  //Delete the existing Blogs from the test DB
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})


//Test using the a regex to see if the Blog List in the test directory returns a json formatted string
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there exists only 6 blogs', async () => {
  const response = await api.get('/api/blogs')
 
  assert.strictEqual(response.body.length, 6)
})

test('check for id field existence', async () => {
  const response = await api.get('/api/blogs')

  //Body is and array of Blog Objects
  const body = response.body

  console.log(response.body)

  let idFieldExists = true

  body.forEach((blog) => {
    if (!blog.id) {
      idFieldExists = false
    }
  })


  assert(idFieldExists)
})


test('Insert a blog into the DB', async () => {
  const newBlog = {
    title: "JS is a weird langauge",
    author: "Ryan Davis",
    url: "ryandavisim@co.uk",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(curBody => curBody.title)

  assert(titles.includes("JS is a weird langauge"))
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})


test-only('Delete An Existing ID', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    const titles = blogsAfterDelete.map(curBody => curBody.title)

    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogAfterDelete.length, helper.initialBlogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
