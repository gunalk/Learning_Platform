import axiosInstance from "@/api/axiosInstance"


export const registerUser=async(formData)=>{
    try{
      const data=axiosInstance.post("/auth/register",{
        ...formData,
        role:"user"
      })

      return data
    }
    catch(err){

        console.log(err)

    }
}