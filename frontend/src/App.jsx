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
import PropertyListings from "./pages/landlord/PropertyListings";
import Bookkeeping from "./pages/landlord/Bookkeeping";
import DocumentVault from "./pages/landlord/DocumentVault";
import InvestmentCalculator from "./pages/landlord/InvestmentCalculator";
import IssueWarning from "./pages/landlord/IssueWarning";
import Maintenance from "./pages/landlord/Maintenance";
import Messages from "./pages/landlord/Messages";
import MyTenants from "./pages/landlord/MyTenants";
import Payemnt from "./pages/landlord/Payemnt";
import PropertyInspection from "./pages/landlord/PropertyInspection";
import PropertyManager from "./pages/landlord/PropertyManager";
import Ratings from "./pages/landlord/Ratings";
import ReantalSearch from "./pages/landlord/ReantalSearch";
import Reports from "./pages/landlord/Reports";
import Settings from "./pages/landlord/Settings";

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
        <Route path="property-listings" element={<PropertyListings />} />
        <Route path="bookkeeping" element={<Bookkeeping />} />
        <Route path="document-vault" element={<DocumentVault />} />
        <Route
          path="investment-calculator"
          element={<InvestmentCalculator />}
        />
        <Route path="issue-warning" element={<IssueWarning />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="messages" element={<Messages />} />
        <Route path="my-tenants" element={<MyTenants />} />
        <Route path="payemnts" element={<Payemnt />} />
        <Route path="property-inspection" element={<PropertyInspection />} />
        <Route path="property-manager" element={<PropertyManager />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="rental-search" element={<ReantalSearch />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/landlord/dashboard" />} />
      </Route>

      {/* <Route path="tenants" element={<Tenants />} />
        <Route path="requests" element={<Requests />} /> */}
    </Routes>
  );
}

export default App;
