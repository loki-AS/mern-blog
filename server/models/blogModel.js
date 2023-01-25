const mongoose = require("mongoose")

const blogModel = mongoose.Schema({
    title: { type: "String", required: true },
    subtitle: { type: "String", required: true },
    blog: { type: "String", required: true },
    picture: { type: "String", required: true, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    category: {type: "String", required: true},
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{ timestamps: true }
)

const Blog = mongoose.model("Blog", blogModel)

module.exports = Blog