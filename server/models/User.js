import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    email:{
        type: String,
        required: [true, "Please provide the email"]
    },
    username:{
        type:String,
        required: [true, "Please provide the username"]
    },

    password:{
        type:String,
        required: false
    },
    role:{
        type:String, 
        enum:['admin','passenger','driver','company'],
        default:'passenger'
    }
});

const User = mongoose.model("User", userSchema)
export default User;