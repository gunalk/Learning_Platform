import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import ProctectedRoute from "./components/Protected_route";
import { AuthContext } from "./contexts/auth-context/AuthContext";
import { useContext } from "react";
import InstructorDashboard from "./pages/instructor";
import Home from "./pages/student/Home";
import NotFoundPage from "./pages/not-found";
import AddNewCourse from "./pages/instructor/AddNewCourse";

const App = () => {
  const { auth } = useContext(AuthContext);

  console.log("auth", auth?.user);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <ProctectedRoute
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <ProctectedRoute
            element={<InstructorDashboard />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
       <Route
        path="/instructor/createNewCourse"
        element={
          <ProctectedRoute
            element={<AddNewCourse />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <ProctectedRoute
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
