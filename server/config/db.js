import mongoose from 'mongoose';


const connectToDb = async ()=>{

    try 
    {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, ()=>{
            console.log("Successfully connected to mongo db")
        });
    }
    catch (error) 
    {
        console.log("Error occurred while connecting to database");
        process.exit(1);
    }
}

export default connectToDb;