import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
