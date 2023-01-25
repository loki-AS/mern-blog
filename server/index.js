const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors");

const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const dotenv = require("dotenv");
const app = express()
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOOSE_URL)
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);


app.listen("3001", () => {
    console.log("server started in the port 3001")
})