import Route from "../models/busRoute.js"


const postBusRoute = async (request, response) => 
{
    try {
        const data = request.body; 

        const route = await Route.findOne({
                $or: [
                  {start: data.start, end: data.end},
                  {start: data.end, end: data.start },
                ]
              });

        if(route)
        {
            return response.status(400).json({
                success:false, 
                message:"cannot have duplicate routes"
            }); 
        }
    
         const result = await Route.create({
               start:data.start, 
               end:data.end, 
               price:data.price,
         }); 

         return response.status(200).json({
                    success:true, 
                    data:result
                }); 
    } catch (error) {
        
        return response.status(400).json({
            success:false, 
            message:"bus route saving failed"
        }); 
    }
}

const getBusRoutes = async (request, response) => 
{

    try {
         const result = await Route.find({}).sort("start")
         return response.status(200).json({
                    success:true, 
                    data:result
                }); 
    } catch (error) {
        
        return response.status(400).json({
            success:false, 
            message:"request failed"
        }); 
    }
}

export {postBusRoute,getBusRoutes};