import { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignupPage from "./components/Signup";
import LoginPage from "./components/Login";
import AudienceManagement from "./pages/AudienceManagment";
import AudienceDetails from "./pages/AudienceDetails";
import CampaignManagement from "./pages/CampaignManagement";
import AudienceCommunication from "./pages/AudienceCommunication";
import ViewCommunicationLogs from "./pages/ViewCommunicationLogs";
import LoginSignup from "./pages/GetStarted";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/login", "/signup"];

  return (
    <div className="w-[100vw] h-[100vh] min-h-screen overflow-y-auto bg-black landing relative z-0">
      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/audience" element={<AudienceManagement />} />
        <Route path="/campaign" element={<CampaignManagement />} />
        <Route path="/audience/:id" element={<AudienceDetails />} />
        <Route path="/communication" element={<AudienceCommunication />} />
        <Route path="/logs" element={<ViewCommunicationLogs />} />
      </Routes>
    </div>
  );
}

export default App;
