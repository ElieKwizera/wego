import Location from "../models/location.js";


const postLocation = async (request, response) => 
{
    try {
        const {name} = request.body;
        const existingLocation = await Location.findOne({name:name});
        if(existingLocation)
        {
            console.log("location already exists")
            return response.status(400).json({success:false,message:"Location already exists"});
        }

         const result = await Location.create({name});

         return response.status(200).json({
                    success:true, 
                    data:result
                }); 
    } catch (error) {
        console.log(error.message)
        return response.status(400).json({
            success:false, 
            message:"location saving failed"
        }); 
    }
}

const getLocations = async (request, response) => 
{
    try {

         const result = await Location.find({}).sort("name")

         return response.status(200).json({
                    success:true, 
                    data:result
                }); 
    } catch (error) {
        console.log(error.message);
        return response.status(400).json({
            success:false, 
            message:"request failed"
        }); 
    }
}

export {postLocation,getLocations};