import mongoose from 'mongoose';

const routeSchema = mongoose.Schema({

    start:{
        type:String,
        required: [true, "Please provide the start location"]
    },

    end:{
        type:String,
        required: [true, "Please provide the end location"]
    },

    price:{
        type:Number,
        required: [true, "Please provide the price"]
    },


});

const Route = mongoose.model("Route", routeSchema)
export default Route;