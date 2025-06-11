import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import {
  LandlordRoute,
  TenantRoute,
  PropertyManagerRoute,
} from "./components/auth/ProtectedRoute";
import AuthRedirect from "./components/auth/AuthRedirect";
import Landing from "./pages/Landing";

// Auth Pages (using existing auth pages for now)
import ExistingLogin from "./pages/auth/Login";
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
import DocumentVaultMaster from "./components/landlord/DocumentVault/DocumentVaultMaster";

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
import Applications from "./pages/landlord/Applications";
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
import TenantPaymentMaster from "./components/tenants/Payments/tenantsPaymentMaster";
import TenantSettings from "./components/tenants/TenantsSettings/TenantSettings";

// Property Manager Pages
import ManagerDashbord from "./pages/propertyManager/ManagerDashboard";
import ManagerProperties from "./pages/propertyManager/Properties";
import ManagerTenants from "./pages/propertyManager/Tenants";
import ManagerPropertyInspection from "./pages/propertyManager/PropertyInspection";
import ManagerWorkOrders from "./pages/propertyManager/WorkOrders";
import ManagerRentCollection from "./pages/propertyManager/RentCollection";
import ManagerLeaseManagement from "./pages/propertyManager/LeaseManagement";
import ManagerMessages from "./pages/propertyManager/Messages";
import ManagerReports from "./pages/propertyManager/Reports";
import ManagerSettings from "./pages/propertyManager/Settings";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/landing" element={<Landing />} />

        {/* Auth Routes */}
        <Route path="/login" element={<ExistingLogin />} />
        <Route path="/auth/login" element={<ExistingLogin />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Landlord */}
        <Route
          path="/landlord"
          element={
            <LandlordRoute>
              <LandLordLayout />
            </LandlordRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertiesDetails />} />
          <Route path="property-listings" element={<PropertyListings />} />
          <Route path="bookkeeping" element={<Bookkeeping />} />
          <Route path="document-vault" element={<DocumentVaultMaster />} />
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
          <Route path="applications" element={<Applications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/landlord/dashboard" />} />
        </Route>

        {/* Tenant Routes */}
        <Route
          path="/tenants"
          element={
            <TenantRoute>
              <TenantsLayout />
            </TenantRoute>
          }
        >
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="rental-search" element={<TenantRentalSearch />} />
          <Route path="properties" element={<TenantProperties />} />
          <Route path="past-properties" element={<PastProperties />} />
          <Route path="property-manager" element={<TenantPropertyManager />} />
          <Route path="report-landlord" element={<TenantsReportLandlord />} />
          <Route path="my-offers" element={<TenantMyOffers />} />
          <Route path="my-property" element={<TenantMyProperty />} />
          <Route
            path="property-inspection"
            element={<ForTenantsPropertyInspection />}
          />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="emails" element={<Messages />} />
          <Route path="payemnts" element={<TenantPaymentMaster />} />
          <Route path="settings" element={<TenantSettings />} />

          <Route path="*" element={<Navigate to="/tenants/dashboard" />} />
        </Route>

        {/* Property Manager */}
        <Route
          path="/manager"
          element={
            <PropertyManagerRoute>
              <PropertyManagerLayout />
            </PropertyManagerRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashbord />} />
          <Route path="properties" element={<ManagerProperties />} /> 
          <Route
            path="property-inspection"
            element={<ManagerPropertyInspection />}
          />
          <Route path="work-orders" element={<ManagerWorkOrders />} />
          <Route path="rent-collection" element={<ManagerRentCollection />} />
          <Route path="lease-management" element={<ManagerLeaseManagement />} />
          <Route path="emails" element={<ManagerMessages />} />
          <Route path="reports" element={<ManagerReports />} />
          <Route path="settings" element={<ManagerSettings />} />

          <Route path="*" element={<Navigate to="/manager/dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
