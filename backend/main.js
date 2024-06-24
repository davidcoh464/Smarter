require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

const router_user = require("./Router/user_router")
const router_resume = require("./Router/extract_resume_router")
const create_tset = require("./Router/level_exam_router")


app.use(cors())
app.use(express.json())
app.use("/user", router_user)
app.use("/resume", router_resume)
app.use("/test", create_tset)

const port = process.env["PORT"] || 8000;
app.listen(port,
    () => { console.log(`Server is running on http://localhost:${port}/`) });

mongoose.connect("mongodb://127.0.0.1:27017/programmer_guide")
    .then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("Failed to connect to MongoDB", err));
