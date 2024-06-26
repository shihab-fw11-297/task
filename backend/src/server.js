const express = require("express");
const cors = require('cors');
const {connection} = require("./config/db");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/product", productRoute);
app.use("/api/v1/user",userRoute);


const PORT = process.env.PORT || 2000;

app.listen(PORT, async function () {
    connection();
   console.log(`listening on port ${PORT}`);
})