import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import Landing from "./pages/Landing";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Layouts
import LandLordLayout from "./pages/landlord/LandlordLayout";
import TenantsLayout from "./pages/tenant/TenantsLayout";
import PropertyManagerLayout from "./pages/propertyManager/propertyManagerLayout";

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

// Tenant Pages (tenant-specific components only)
import TenantDashboard from "./pages/tenant/Dashboard";
import TenantRentalSearch from "./pages/tenant/RentalSearch";
import TenantProperties from "./pages/tenant/Properties"; 
import TenantPropertyManager from "./pages/tenant/PropertyManager";
import TenantsReportLandlord from "./pages/tenant/IssueWarning";
import TenantMyOffers from "./pages/tenant/MyOffers";
import TenantMyProperty from "./pages/tenant/MyProperty"; 
import PastProperties from "./pages/tenant/PastProperties"; 
import ForTenantsPropertyInspection from "./pages/tenant/PropertyInspection";


function App() {
  // const isAuthenticated = true;
  // const user = {
  //   role: "admin", // Change this to test different roles
  // };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
 

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

      {/* Tenant Routes */}
      <Route path="/tenants" element={<TenantsLayout />}>
        <Route path="dashboard" element={<TenantDashboard />} />
        <Route path="rental-search" element={<TenantRentalSearch />} />
        <Route path="properties" element={<TenantProperties />} />
        <Route path="past-properties" element={<PastProperties />} />
        <Route path="property-manager" element={<TenantPropertyManager />} />
        <Route path="report-landlord" element={<TenantsReportLandlord />} />
        <Route path="my-offers" element={<TenantMyOffers />} />
        <Route path="my-property" element={<TenantMyProperty />} />
        <Route path="property-inspection" element={<ForTenantsPropertyInspection />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="emails" element={<Messages />} />
        <Route path="payemnts" element={<Payemnt />} />
        <Route path="settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/tenants/dashboard" />} />
      </Route>

      {/* Property Manager */}
      <Route path="/manager" element={<PropertyManagerLayout />}>

      </Route>
    </Routes>
  );
}

export default App;
