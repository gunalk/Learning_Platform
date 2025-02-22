import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/contexts/auth-context/AuthContext";

import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser
  } = useContext(AuthContext);
  const handleValueChange = (val) => {
    setActiveTab(val);
  };
  console.log("ff", signInFormData);
  const tabListArray = [
    {
      label: "Sign In",
      value: "signin",
    },
    {
      label: "Sign Up",
      value: "signup",
    },
  ];
  const checkIsSignInFormIsValid = () => {
    return signInFormData && signInFormData.userEmail !== "" && signInFormData.password !== "";
  };
  const checkIsSignUpFormIsValid = () => {
    return signUpFormData &&  signUpFormData.userName !== "" &&signUpFormData.userEmail !== "" && signUpFormData.password !== "";
  };
  console.log(checkIsSignInFormIsValid())
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center gap-2">
          <GraduationCap classname="h-8 w-8 mr-4" />
          <span>LMS LEARNING</span>
        </Link>
      </header>
      <div className="flex items-center justify-center bg-background min-h-screen">
        <Tabs
          value={activeTab}
          defaultValue="signIn"
          onValueChange={handleValueChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2 ">
            {tabListArray.map((tab, index) => (
              <TabsTrigger value={tab.value} key={index}>
                {tab.label}
              </TabsTrigger>
            ))}
            {/* <TabsTrigger value={"signIn"} >Sign In</TabsTrigger>
                 <TabsTrigger value={"signUp"}>Sign Up</TabsTrigger> */}
          </TabsList>
          <TabsContent value="signin">
            <Card classname="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter Your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signInFormControls}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  buttonText={"Sign In"}
                  isButtonDisabled={!checkIsSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card classname="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create Your New Account</CardTitle>
                <CardDescription>
                  Enter Your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signUpFormControls}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  buttonText={"Sign Up"}
                  
                  isButtonDisabled={!checkIsSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
