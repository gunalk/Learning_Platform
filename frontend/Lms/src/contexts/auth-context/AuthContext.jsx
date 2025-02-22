import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuth, loginUser, registerUser } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const data = await registerUser(signUpFormData);
    console.log("g", data);
  };
  const handleLoginUser = async (e) => {
    e.preventDefault();
    const data = await loginUser(signInFormData);
    console.log(data);
    if (data?.data?.success) {
      sessionStorage.setItem(
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
    console.log("g", data);
  };
  const checkAuthUser = async () => {
    try {
      const data = await checkAuth();
      if (data?.data?.success) {
        sessionStorage.setItem(
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {checkAuthUser()}, []);
  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
