import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({

    userid:{
        type:String,
        require: [true]
    },
    username:{
        type:String,
        required: [true, "Please provide the username"]
    },
    destination: {
        type:String, 
        required: [true, "destinaton must be provide"]
    }, 
    departure: {
        type:String, 
        required: [true, "destinaton must be provide"]
    }, 
    pickUpTime: {
        type:Date, 
        required: [true]
    },
    passengers: {
        type:Number, 
        required: [true],
        default: 1
    },
    status: {
        type:String, 
        enum: ['pending','declined','approved'],
        required: [true],
        default: 'pending'
    }


});

const Request = mongoose.model("Request", requestSchema)
export default Request;