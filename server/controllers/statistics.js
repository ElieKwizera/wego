import User from "../models/User.js";
import Request from "../models/request.js";
import Location from "../models/location.js";
import Route from "../models/busRoute.js";

const getStatistics = async (req,res)=>
{
    try
    {
        const passengers = await User.find({role:'passenger'}).estimatedDocumentCount();
        const approvedRequests = await Request.find({status:'approved'}).count();
        const pendingRequests = await Request.find({status:'pending'}).count();
        const declinedRequests = await Request.find({status:'declined'}).count();
        const locations = await Location.find().estimatedDocumentCount();
        const routes = await Route.find().estimatedDocumentCount();

        return res.status(200).json({success:true,data:{passengers,approvedRequests,pendingRequests,declinedRequests,locations,routes}});
    }
    catch (err)
    {
        return res.status(500).json({ success: false, message:'Internal server error'});
    }

}

export {getStatistics};