import express from "express";
import  {registerUser,LoginUser}  from "../../controller/authController/index.js"
import { authenticate } from "../../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/check-auth",authenticate,(req,res)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        message:"Authenticated User!",
        data:{
            user:user
        }
    })
})

export default router;
