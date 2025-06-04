import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import Landing from "./pages/Landing";

// Layouts
import LandLordLayout from "./pages/landlord/LandlordLayout";

// Landlord Pages
import Dashboard from "./pages/landlord/Dashboard";
import Properties from "./pages/landlord/Properties";
import PropertiesDetails from "./components/landlord/Properties/PropertiesDetails";

function App() {
  // const isAuthenticated = true;
  // const user = {
  //   role: "admin", // Change this to test different roles
  // };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* auth */}
      {/* <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route> */}

      {/* Landlord */}
      <Route path="/landlord" element={<LandLordLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertiesDetails />} />
      </Route>

      {/* <Route path="tenants" element={<Tenants />} />
        <Route path="requests" element={<Requests />} /> */}
    </Routes>
  );
}

export default App;
