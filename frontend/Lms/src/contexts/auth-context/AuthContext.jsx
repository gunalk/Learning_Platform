import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuth, loginUser, registerUser } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading,setPageLoading]=useState(true)
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const handleRegisterUser = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const data = await registerUser(signUpFormData);
      console.log("g", data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleLoginUser = async (e) => {
    setLoading(true)
    try {
      e.preventDefault();
      const data = await loginUser(signInFormData);
      console.log(data);
      if (data?.data?.success && data?.data?.data?.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data?.data?.data?.accessToken)
        );
        setAuth({
          authenticate: true,
          user: data?.data?.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };
  const checkAuthUser = async () => {
    try {
      const data = await checkAuth();
      console.log("data",data)
      if (data?.data?.success ) {
       
        setAuth({
          authenticate: true,
          user: data?.data?.data?.user,
        });
       
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
      setPageLoading(false)
     
    } catch (err) {
      console.log(err);
      if(err?.response?.data?.success){
        setAuth({
          authenticate: false,
          user: null,
        });
      }
      setPageLoading(false)
    
    }
  };

  const resetCredientials=()=>{
    setAuth({
      authenticate:false,
      user:null
    })
  }
  useEffect(() => {
    checkAuthUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        auth,
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        loading,
        resetCredientials
      }}
    >
      {
        pageLoading ? <Skeleton/> :
        children
      }
     
    </AuthContext.Provider>
  );
}
