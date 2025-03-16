import InstructorCourses from "@/components/Instructor-view/Courses";
import IntructorDashboardComponent from "@/components/Instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/contexts/auth-context/AuthContext";
import { BarChart, Book, LogOut } from "lucide-react";
import React, { useContext, useState } from "react";

const InstructorDashboard = () => {
  const { resetCredientials } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <IntructorDashboardComponent />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];
  const handleLogout = () => {
    resetCredientials();
    localStorage.clear();
  };
  console.log("activeTab", activeTab);
  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <aside className="w-64 bg-white ">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menu, index) => (
              <Button
                className="w-full flex justify-start mb-2"
                key={index}
                variant={activeTab === menu.value ? 'secondary':'ghost'}
                onClick={
                  menu.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menu.value)
                }
              >
                <menu.icon className="mr-2 h-4 w-4" />
                {menu.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-red-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onChangeValue={setActiveTab}>
            {menuItems.map((menu, index) => (
              <TabsContent value={menu.value} key={index}>
                {menu.component !== null ? menu.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>{" "}
    </div>
  );
};

export default InstructorDashboard;
