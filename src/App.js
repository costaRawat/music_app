import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path="/login" element={<Login />} />
     
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;

