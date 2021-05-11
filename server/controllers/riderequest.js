import Request from "../models/request.js";



const postRequest = async (request, response) => 
{
    try {
        const data = request.body;
        const user = request.user;
         if(!user)
         {
             throw "error occured";
         }
         const result = await Request.create({
               userid:user._id,
               username:user.username,
               destination:data.destination, 
               departure:data.departure, 
               pickUpTime:data.pickUpTime, 
               passengers:data.passengers, 
               status:"pending",
         }); 

         return response.status(200).json({
                    success:true, 
                    data:result
                }); 
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            success:false, 
            message:"request saving failed"
        }); 
    }
}

const getRequests = async (request, response) => 
{
    try {
         let query = {};

         if(request.user.role === "passenger")
         {
             query = {userid:request.user._id}
         }

         const result = await Request.find(query).sort("pickUpTime")

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

export {postRequest,getRequests};