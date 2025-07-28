# Bloom 🏠

**A Comprehensive Property Management Platform for the UAE Real Estate Market**

Bloom is a modern, full-stack property management application designed specifically for the UAE real estate market. It provides a unified platform for landlords, tenants, and property managers to streamline property operations, rental processes, and tenant relationships.

## 🌟 **Overview**

Bloom bridges the gap between property owners, tenants, and property managers by providing role-specific dashboards and features tailored to each user type. Built with modern web technologies, it offers a seamless experience for managing properties, tracking payments, handling maintenance requests, and facilitating communication between all parties.

### **Key Users**
- **🏢 Landlords**: Property owners managing rental properties
- **🏠 Tenants**: Renters looking for properties and managing their rental experience
- **👔 Property Managers**: Professional managers handling multiple properties for landlords

## 🚀 **Key Features**

### **For Landlords**
- **📊 Dashboard**: Comprehensive overview of properties, income, and tenant metrics
- **🏘️ Property Management**: Add, edit, and manage property listings
- **💰 Financial Tracking**: Bookkeeping, rent collection, and investment calculations
- **👥 Tenant Management**: Track tenant applications, leases, and communications
- **🔧 Maintenance**: Handle maintenance requests and contractor management
- **📋 Property Inspections**: Schedule and track property inspections
- **📄 Document Vault**: Secure storage for property documents and contracts
- **⭐ Ratings & Reviews**: Tenant rating system
- **📈 Reports**: Detailed analytics and financial reports

### **For Tenants**
- **🔍 Property Search**: Browse available rental properties
- **📝 Applications**: Submit and track rental applications
- **💳 Payments**: Manage rent payments and payment history
- **🛠️ Maintenance Requests**: Submit and track maintenance issues
- **📱 Communication**: Direct messaging with landlords/property managers
- **📋 Property Inspections**: Schedule and participate in inspections
- **⭐ Reviews**: Rate and review landlords and properties
- **📊 Dashboard**: Personal rental overview and important notifications

### **For Property Managers**
- **🏢 Multi-Property Management**: Manage properties across multiple landlords
- **👥 Tenant Relations**: Handle tenant communications and issues
- **💼 Work Orders**: Coordinate maintenance and repairs
- **💰 Rent Collection**: Manage rent collection across portfolios
- **📋 Lease Management**: Handle lease agreements and renewals
- **👷 Contractor Coordination**: Manage contractor relationships and work orders 

## 🛠️ **Technology Stack**

### **Frontend**
- **⚛️ React 19.1.0**: Modern React with latest features
- **🎨 Tailwind CSS 4.1.8**: Utility-first CSS framework
- **🧩 Radix UI**: Accessible component primitives
- **📱 Responsive Design**: Mobile-first approach
- **🎯 Vite**: Fast build tool and development server
- **🧭 React Router**: Client-side routing
- **📊 Recharts**: Data visualization and charts
- **🎨 Lucide React**: Beautiful icon library
- **📋 React Hook Form**: Form management
- **🔔 React Hot Toast**: Notification system

### **UI Components & Libraries**
- **🎨 shadcn/ui**: Modern component library
- **📊 Custom StatCard**: Reusable statistics components
- **📋 Advanced Tables**: Sortable, searchable data tables
- **🎯 Custom Buttons**: Comprehensive button system
- **📱 Responsive Layouts**: Mobile-optimized interfaces

### **Development Tools**
- **📝 ESLint**: Code linting and formatting
- **🔧 Vite**: Development server and build tool
- **📦 npm**: Package management
- **🎯 Modern JavaScript**: ES6+ features

## 📁 **Project Structure**

```
PropHarmony/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/        # Shared components (StatCard, Tables, Buttons)
│   │   │   ├── landlord/      # Landlord-specific components
│   │   │   ├── tenants/       # Tenant-specific components
│   │   │   ├── propertyManager/ # Property manager components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── layout/        # Layout components (Sidebar, TopBar)
│   │   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   │   └── shared/        # Cross-role shared components
│   │   ├── pages/             # Page components
│   │   │   ├── landlord/      # Landlord pages
│   │   │   ├── tenant/        # Tenant pages
│   │   │   ├── propertyManager/ # Property manager pages
│   │   │   └── auth/          # Authentication pages
│   │   ├── contexts/          # React contexts (Auth, etc.)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   ├── data/              # Mock data and constants
│   │   ├── utils/             # Utility functions
│   │   ├── config/            # Configuration files
│   │   └── assets/            # Static assets
│   ├── public/                # Public assets
│   └── package.json           # Dependencies and scripts
├── backend/                   # Backend API (Future implementation)
└── README.md                  # This file
```

## 🚀 **Getting Started**

### **Prerequisites**
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PropHarmony
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server with hot reload
npm run dev --host   # Start dev server accessible on network

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🎯 **User Roles & Access**

### **Authentication System**
PropHarmony implements role-based authentication with three distinct user types:

#### **🏢 Landlord Access**
- **Route**: `/landlord/*`
- **Features**: Full property management, tenant oversight, financial tracking
- **Dashboard**: Property portfolio overview, income analytics, tenant management

#### **🏠 Tenant Access**
- **Route**: `/tenants/*`
- **Features**: Property search, application management, payment tracking
- **Dashboard**: Personal rental information, payment history, maintenance requests

#### **👔 Property Manager Access**
- **Route**: `/manager/*`
- **Features**: Multi-property management, tenant relations, work order coordination
- **Dashboard**: Portfolio overview, work order management, tenant communications

### **Protected Routes**
All user-specific routes are protected and redirect unauthorized users to appropriate dashboards.

## 🎨 **UI Components & Design System**

### **Reusable Components**

#### **📊 StatCard Component**
```jsx
import { StatCard, StatGrid } from '@/components/common/StatCard';

// Individual stat card
<StatCard
  title="Total Properties"
  value={24}
  color="blue"
  icon={Building2}
  trend="up"
  trendValue="+12%"
/>

// Grid of stat cards
<StatGrid stats={propertyStats} columns={4} />
```

#### **📋 Advanced Tables**
```jsx
import { DataGrid, Table, SimpleTable } from '@/components/common/Table';

// Advanced data grid with search, export, pagination
<DataGrid
  data={properties}
  columns={columns}
  searchable={true}
  exportable={true}
  pagination={true}
/>
```

#### **🎯 Button System**
```jsx
import { Button } from '@/components/common/Buttons';

<Button variant="primary" size="lg" icon={Plus}>
  Add Property
</Button>
```

### **Design Principles**
- **🎨 Consistent Color Palette**: Blue primary, semantic colors for status
- **📱 Mobile-First**: Responsive design for all screen sizes
- **♿ Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **🎯 User-Centric**: Role-specific interfaces and workflows
- **⚡ Performance**: Optimized components and lazy loading

## 🔧 **Key Features Deep Dive**

### **Property Management**
- **📝 Property Listings**: Create and manage detailed property listings
- **📸 Media Management**: Upload and organize property photos
- **💰 Pricing Management**: Set rent, deposits, and pricing strategies
- **📋 Availability Tracking**: Manage property availability and booking calendars

### **Financial Management**
- **💳 Payment Processing**: Handle rent payments and financial transactions
- **📊 Bookkeeping**: Track income, expenses, and financial reports
- **📈 Investment Calculator**: ROI calculations and investment analysis
- **💰 Revenue Analytics**: Detailed financial reporting and insights

### **Communication System**
- **💬 Messaging**: Direct communication between all parties
- **📧 Email Integration**: Automated notifications and updates
- **🔔 Notifications**: Real-time alerts for important events
- **📱 Mobile Notifications**: Push notifications for mobile users

### **Maintenance Management**
- **🔧 Request System**: Submit and track maintenance requests
- **👷 Contractor Management**: Coordinate with service providers
- **📋 Work Orders**: Detailed work order management and tracking
- **📊 Maintenance Analytics**: Track costs and response times

## 🌍 **UAE Market Focus**

### **Localization Features**
- **💰 AED Currency**: Native support for UAE Dirham
- **🏛️ Local Regulations**: Compliance with UAE rental laws
- **🌐 Arabic Support**: RTL language support (future feature)
- **📍 UAE Locations**: Dubai, Abu Dhabi, and other Emirates
- **🏢 Property Types**: Villas, apartments, commercial properties

### **Market-Specific Features**
- **📋 RERA Compliance**: Real Estate Regulatory Agency compliance
- **💳 Local Payment Methods**: UAE banking integration
- **📄 Standard Contracts**: UAE-standard lease agreements
- **🏛️ Government Integration**: Future integration with government services

## 🔒 **Security & Privacy**

### **Data Protection**
- **🔐 Secure Authentication**: Role-based access control
- **🛡️ Data Encryption**: Secure data transmission and storage
- **👤 Privacy Controls**: User data privacy and consent management
- **📋 Audit Trails**: Comprehensive activity logging

### **Compliance**
- **🏛️ UAE Data Protection**: Compliance with local data protection laws
- **🔒 GDPR Ready**: European data protection compliance
- **📋 Document Security**: Secure document storage and access
- **🔐 Access Controls**: Granular permission management

## 📈 **Performance & Scalability**

### **Optimization Features**
- **⚡ Fast Loading**: Optimized bundle sizes and lazy loading
- **📱 Mobile Performance**: Optimized for mobile devices
- **🔄 Caching**: Intelligent caching strategies
- **📊 Analytics**: Performance monitoring and optimization

### **Scalability**
- **🏗️ Modular Architecture**: Component-based scalable structure
- **🔧 API Ready**: Prepared for backend API integration
- **📈 Growth Ready**: Architecture supports feature expansion
- **🌐 Multi-Tenant**: Support for multiple property portfolios

## 🚧 **Development Status**

### **Current Status**
- ✅ **Frontend Complete**: Full React application with all user interfaces
- ✅ **Component Library**: Comprehensive reusable component system
- ✅ **Authentication**: Role-based authentication system
- ✅ **Responsive Design**: Mobile-optimized interfaces
- ✅ **Mock Data**: Comprehensive test data for all features

### **Future Development**
- 🔄 **Backend API**: Node.js/Express backend development
- 🗄️ **Database**: MongoDB/PostgreSQL integration
- 🔐 **Real Authentication**: JWT-based authentication system
- 💳 **Payment Integration**: UAE payment gateway integration
- 📱 **Mobile App**: React Native mobile application
- 🌐 **Arabic Support**: RTL language support
- 🏛️ **Government APIs**: Integration with UAE government services

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**
- **📝 ESLint**: Follow established linting rules
- **🎨 Prettier**: Consistent code formatting
- **📋 Component Standards**: Follow established component patterns
- **🧪 Testing**: Write tests for new features
- **📚 Documentation**: Document new components and features

## 📞 **Support & Contact**

### **Getting Help**
- **📚 Documentation**: Comprehensive component documentation in `/docs`
- **💬 Issues**: Report bugs and request features via GitHub Issues
- **📧 Contact**: Reach out for support and questions

### **Resources**
- **🎨 Design System**: Component library documentation
- **📋 API Documentation**: Backend API documentation (when available)
- **🎯 User Guides**: Role-specific user guides and tutorials
- **🔧 Developer Guides**: Technical implementation guides
 

## 🙏 **Acknowledgments**

- **⚛️ React Team**: For the amazing React framework
- **🎨 Tailwind CSS**: For the utility-first CSS framework
- **🧩 Radix UI**: For accessible component primitives
- **🎯 Vite**: For the fast build tool
- **🎨 Lucide**: For the beautiful icon library
- **🏢 UAE Real Estate Market**: For inspiration and requirements

---

**PropHarmony** - *Harmonizing Property Management in the UAE* 🏠✨