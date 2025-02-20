import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerUser } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  const handleRegisterUser=async(e)=>{
    e.preventDefault()
    const data=await registerUser(signUpFormData)
    console.log('g',data)
  }
  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
