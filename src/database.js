import mongoose from "mongoose";

mongoose.connect("databa base here", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('db is connected'))
    .catch(error => console.log(error))