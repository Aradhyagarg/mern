const mongoose = require('mongoose');
const MONGODB = process.env.MONGO_DB;
mongoose.connect(MONGODB).then(() => {
    console.log("connection success");
}).catch((err) => console.log("no connection"));