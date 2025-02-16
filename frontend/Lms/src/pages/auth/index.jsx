
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { GraduationCap } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"


const AuthPage = () => {
    const [activeTab,setActiveTab]=useState("signin")
    const handleValueChange = (val)=>{
        setActiveTab(val)
    }
    const tabListArray=[{
        label: "Sign In",
        value: "signin",}
    ,{
        label: "Sign Up",
        value: "signup",
    }]
  return (
    <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <Link to={"/"} className="flex items-center justify-center gap-2">
            <GraduationCap classname="h-8 w-8 mr-4"/>
            <span>LMS LEARNING</span>
            </Link>
        </header>
        <div className="flex items-center justify-center bg-background min-h-screen">
            <Tabs
            value={activeTab}
            defaultValue="signIn"
            onValueChange={handleValueChange}
            className ="w-full max-w-md">
               <TabsList className="grid w-full grid-cols-2 ">
                {tabListArray.map((tab,index)=>(
                    <TabsTrigger value={tab.value} key={index}>{tab.label}</TabsTrigger>
                ))}
                 {/* <TabsTrigger value={"signIn"} >Sign In</TabsTrigger>
                 <TabsTrigger value={"signUp"}>Sign Up</TabsTrigger> */}
               </TabsList>
              <TabsContent value="signin">
              signIn
              </TabsContent>
              <TabsContent value="signup">
              signUp
              </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default AuthPage