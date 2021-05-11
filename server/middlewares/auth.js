import jwt from 'jsonwebtoken';
import User from "../models/User.js";


const auth = async (req,res,next)=>{

    try
    {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        if(token === null)
            return res.status(403).json({
                success: false,
                message: 'Authentication token not found'
            });
        jwt.verify(token,process.env.SECRET_KEY,async (err,user) =>
        {
            if(err)
            {
                return res.status(403).json(
                    {
                        success: false,
                        message: 'Invalid authentication token'
                    });
            }

            req.user = await User.findOne({_id:user.id});
            next();
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(403).json(
            {
                success: false,
                message: 'authentication failed'
            });
    }

}

export default auth;