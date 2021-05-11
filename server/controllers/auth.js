import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import {validateEmail, validatePassword, validateUsername} from "../utils/validations.js";



const register = async (req,res)=>
{
    const {username,email,password} = req.body;
    try 
    {
        if(!validateUsername(username))
        {
            return res.status(400).json({
                success:false,
                message: "Please provide a valid username"
            })
        }

        if(!validatePassword(password))
        {
            return res.status(400).json({
                success:false,
                message: "Please provide a valid password"
            })
        }

        if(!validateEmail(email))
        {
            return res.status(400).json({
                success:false,
                message: "Please provide a valid email"
            })
        }

        const existingUser = await User.findOne({email}).select("-password");
        if(existingUser)
        {
            return res.status(400).json({success:false,message:"User with that email already exists"});
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        const user = await User.create({username,email,password:hashedPassword});

        const token = jwt.sign({id:user._id},process.env.SECRET_KEY, {expiresIn: '3d'});

        return res.status(201).json({success:true,data:user,token});

    }
    catch (error) 
    {
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

const login = async (req,res)=>
{
    const {email,password} = req.body;
    try
    {
        if(!validatePassword(password))
        {
            return res.status(400).json({
                success:false,
                message: "Please provide a valid password"
            })
        }

        if(!validateEmail(email))
        {
            return res.status(400).json({
                success:false,
                message: "Please provide a valid email"
            })
        }
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success: false,message:"User with tha email not found"});
        }
        const passwordMatch = bcrypt.compareSync(password,user.password);

        if(!passwordMatch)
        {
            return res.status(400).json({success:false,message:"Please use the right password"});
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY,{expiresIn: '3d'});
        return res.status(200).json({success:true,data:user,token});

    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

const googleLogin = async (req,res)=>{

    const {username,email} = req.body;
    try
    {
        const user = await User.findOne({email}).select("-password");
        if(user)
        {
            const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY);
            return res.status(200).json({success:true,data:user,token});
        }

        const newUser = await User.create({email,username});
        const token = jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn: '3d'});
        return res.status(200).json({success:true,data:newUser,token});
    }
    catch (error)
    {
        return res.status(500).json({success:false,message:"Internal server error"});
    }
};

const getMe = async (req,res)=>{
    return req.user;
}

const getUsers = async (req,res)=>{

    try 
    {
        const users = await User.find(); 
        if(users)
        {
            return res.status(200).json({success:true, data:users});
        }   
    } 
    catch (error) 
    {
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

const updateUser = async (req,res) => {
    try
    {
        const { role, id } = req.body;
        const user = await User.findOne({_id:id});
        if(user) {
            user.role = role;
            await user.save();

            const users = await User.find({});
            return res.status(200).json({success:true, data:users});
        }
    }
    catch (error)
    {
        console.log(error.message);
        return res.status(500).json({success:false,message:"Internal server error"});

    }
}

export {register,login,googleLogin,getMe, getUsers, updateUser};