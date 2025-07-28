import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Home, 
  Calendar,
  Star,
  MessageCircle,
  Eye,
  Heart,
  Settings,
  BarChart3
} from 'lucide-react';
import { StatCard, StatGrid } from './index';

/**
 * StatCard Component Examples and Usage Guide
 */
const StatCardExamples = () => {
  const [loading, setLoading] = useState(false);

  // Sample data for property management
  const propertyStats = [
    {
      id: 'total-properties',
      title: 'Total Properties',
      value: 24,
      subtitle: '3 new this month',
      icon: Building2,
      color: 'blue',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      id: 'active-tenants',
      title: 'Active Tenants',
      value: 18,
      subtitle: '2 pending applications',
      icon: Users,
      color: 'green',
      trend: 'up',
      trendValue: '+5%'
    },
    {
      id: 'monthly-revenue',
      title: 'Monthly Revenue',
      value: 125000,
      subtitle: 'Last updated today',
      icon: DollarSign,
      color: 'yellow',
      showCurrency: true,
      trend: 'up',
      trendValue: '+8%'
    },
    {
      id: 'occupancy-rate',
      title: 'Occupancy Rate',
      value: '92%',
      subtitle: 'Above average',
      icon: TrendingUp,
      color: 'purple',
      trend: 'up',
      trendValue: '+3%'
    }
  ];

  // Sample data for tenant dashboard
  const tenantStats = [
    {
      title: 'Rent Due',
      value: 8500,
      subtitle: 'Due in 5 days',
      icon: Home,
      color: 'red',
      showCurrency: true
    },
    {
      title: 'Lease Expires',
      value: '6 months',
      subtitle: 'Renewal available',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Maintenance Requests',
      value: 2,
      subtitle: '1 pending approval',
      icon: Settings,
      color: 'gray'
    }
  ];

  // Handle loading demo
  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  // Handle card click
  const handleCardClick = (stat) => {
    alert(`Clicked on: ${stat.title}\nValue: ${stat.value}`);
  };

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">StatCard Component Examples</h1>
        <p className="text-gray-600 mb-8">
          Comprehensive examples of the reusable StatCard component with different variants, sizes, and configurations.
        </p>

        {/* Basic StatGrid Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Property Management Dashboard</h2>
          <p className="text-gray-600">
            Complete property management stats using StatGrid with default settings.
          </p>
          
          <StatGrid 
            stats={propertyStats}
            columns={4}
            onCardClick={handleCardClick}
          />
        </section>

        {/* Color Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Color Variants</h2>
          <p className="text-gray-600">
            Different color themes for various types of data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Blue Theme" 
              value="1,234" 
              subtitle="Default color"
              icon={BarChart3}
              color="blue"
              trend="up"
              trendValue="+5%"
            />
            <StatCard 
              title="Green Theme" 
              value="98%" 
              subtitle="Success metrics"
              icon={TrendingUp}
              color="green"
              trend="up"
              trendValue="+2%"
            />
            <StatCard 
              title="Red Theme" 
              value="12" 
              subtitle="Critical alerts"
              icon={MessageCircle}
              color="red"
              trend="down"
              trendValue="-3%"
            />
            <StatCard 
              title="Yellow Theme" 
              value="45,000" 
              subtitle="Revenue data"
              icon={DollarSign}
              color="yellow"
              showCurrency={true}
            />
            <StatCard 
              title="Purple Theme" 
              value="4.8" 
              subtitle="Rating average"
              icon={Star}
              color="purple"
              trend="up"
              trendValue="+0.2"
            />
            <StatCard 
              title="Gray Theme" 
              value="156" 
              subtitle="Neutral data"
              icon={Eye}
              color="gray"
            />
          </div>
        </section>

        {/* Size Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Size Variants</h2>
          <p className="text-gray-600">
            Different sizes for various layout needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Small Size" 
              value="42" 
              subtitle="Compact display"
              icon={Users}
              color="blue"
              size="sm"
            />
            <StatCard 
              title="Medium Size" 
              value="1,234" 
              subtitle="Default size"
              icon={Building2}
              color="green"
              size="md"
            />
            <StatCard 
              title="Large Size" 
              value="98,765" 
              subtitle="Prominent display"
              icon={DollarSign}
              color="purple"
              size="lg"
              showCurrency={true}
            />
          </div>
        </section>

        {/* Variant Styles */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Style Variants</h2>
          <p className="text-gray-600">
            Different visual styles for various design needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Default" 
              value="1,234" 
              subtitle="Standard card"
              icon={Building2}
              color="blue"
              variant="default"
            />
            <StatCard 
              title="Minimal" 
              value="5,678" 
              subtitle="Clean design"
              icon={Users}
              color="green"
              variant="minimal"
            />
            <StatCard 
              title="Bordered" 
              value="9,012" 
              subtitle="With border"
              icon={DollarSign}
              color="yellow"
              variant="bordered"
              showCurrency={true}
            />
            <StatCard 
              title="Gradient" 
              value="3,456" 
              subtitle="Gradient background"
              icon={TrendingUp}
              color="purple"
              variant="gradient"
            />
          </div>
        </section>

        {/* Tenant Dashboard Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Tenant Dashboard</h2>
          <p className="text-gray-600">
            Example tenant dashboard with 3-column layout.
          </p>
          
          <StatGrid 
            stats={tenantStats}
            columns={3}
            size="lg"
            variant="bordered"
          />
        </section>

        {/* Interactive Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Interactive Features</h2>
          <p className="text-gray-600">
            Cards with click handlers and loading states.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Clickable Card" 
              value="Click Me!" 
              subtitle="Has onClick handler"
              icon={Heart}
              color="red"
              onClick={() => alert('Card clicked!')}
            />
            <StatCard 
              title="Loading Demo" 
              value="Test Loading" 
              subtitle="Click to see loading"
              icon={Settings}
              color="blue"
              onClick={handleLoadingDemo}
            />
            <StatCard 
              title="No Animation" 
              value="Static" 
              subtitle="No hover effects"
              icon={Eye}
              color="gray"
              animated={false}
            />
          </div>
        </section>

        {/* Loading State */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Loading States</h2>
          <p className="text-gray-600">
            Cards in loading state with skeleton animation.
          </p>
          
          <StatGrid 
            stats={propertyStats.slice(0, 4)}
            columns={4}
            loading={loading}
          />
          
          <button
            onClick={handleLoadingDemo}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Demo Loading State (3s)
          </button>
        </section>

        {/* Custom Content */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Custom Content</h2>
          <p className="text-gray-600">
            Cards with completely custom content layout.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              color="blue"
              customContent={
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Custom Layout</h3>
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Properties</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Occupied</span>
                      <span className="font-medium">22</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Vacant</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              }
            />
            <StatCard 
              color="green"
              variant="gradient"
              customContent={
                <div className="p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold mb-2">AED 125,000</div>
                  <div className="text-sm opacity-90">+8% from last month</div>
                </div>
              }
            />
          </div>
        </section>

        {/* Usage Code Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Usage Examples</h2>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`// Basic StatCard
<StatCard 
  title="Total Properties" 
  value={24} 
  color="blue"
  icon={Building2}
  trend="up"
  trendValue="+12%"
/>

// StatGrid with multiple cards
<StatGrid 
  stats={propertyStats}
  columns={4}
  onCardClick={handleCardClick}
/>

// Different variants
<StatCard variant="gradient" color="purple" size="lg" />
<StatCard variant="bordered" color="blue" />
<StatCard variant="minimal" animated={false} />

// With currency
<StatCard 
  title="Revenue" 
  value={125000} 
  showCurrency={true}
  color="yellow"
/>

// Loading state
<StatCard loading={true} />

// Custom content
<StatCard 
  customContent={<CustomComponent />}
  color="blue"
/>`}</pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StatCardExamples;
