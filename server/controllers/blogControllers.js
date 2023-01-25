const asyncHandler = require("express-async-handler")
const Blog = require("../models/blogModel")
const User = require("../models/userModel")

const createBlog = asyncHandler(async(req, res) => {
    const { users, title, subtitle, blog, picture, category } = req.body;

    const blogData = await Blog.create({
        title,
        subtitle,
        blog,
        picture,
        category,
        users,
    }) 

    if(blogData) {
        res.status(201).json({ blogData })     
    }else {
        res.status(400)
        throw new Error("blog not found")
    }
})

const getBlog = asyncHandler(async(req, res) => {
    const BlogData = await Blog.find({ })
    .populate('users')
    res.send(BlogData)
})

const allBlog = asyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const blog = await Blog.find(keyword).find({ });
    if(blog){
        res.send(blog)
    }else{
        res.status(400)
        throw new Error("blog not found")
    }
})

module.exports = {
    createBlog,
    getBlog,
    allBlog
}