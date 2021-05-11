import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide the start location"], 
        unique: true

    },
    createdAt:{
        type:Date,
        default: new Date().toISOString()
    }

});

const Location = mongoose.model("Location", locationSchema)

export default Location;