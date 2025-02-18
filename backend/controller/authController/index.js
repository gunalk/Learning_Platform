
import bcrypt from 'bcryptjs';
import user from '../../models/user.js';

export const registerUser =async(req,res)=>{
    const { userName, userEmail, password,role } = req.body;
    const existingUser = await user.findOne({ $or: [{ userName: userName }, { userEmail: userEmail }] });

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User name or user email already exists"
        })
    }
    const hashPassword =  await bcrypt.hash(password,10)
    const newUser= new user({userName,userEmail,role,hashPassword})
    await newUser.save()

    return res.status(201).json({
        sucess:true,
        message:"User Registered Successfully!"
    })


}
