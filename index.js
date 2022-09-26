const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan") // Gate request address

//Routes
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.log(err)
        else console.log("mongdb is connected");
    });

//creating the middleware
app.use(express.json()) //body parser when making a post request
app.use(helmet())
app.use(morgan("common"))

//Routes URL
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.listen(8800, () => {
    console.log("Backend server is running")
})

