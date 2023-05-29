import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/");
    }
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
