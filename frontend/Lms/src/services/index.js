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

export const loginUser=async(formData)=>{
  try{
    const data=axiosInstance.post("/auth/login",{
      ...formData,
     
    })

    return data
  }
  catch(err){

      console.log(err)

  }
}

export const checkAuth=async()=>{
  try{
    const data=axiosInstance.get("/auth/check-auth")

    return data
  }
  catch(err){

      console.log(err)

  }
}