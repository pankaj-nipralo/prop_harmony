import React, { useState } from 'react';
import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';
import { StatCard, StatGrid } from './index';

/**
 * Simple test component to verify StatCard functionality
 */
const StatCardTest = () => {
  const [loading, setLoading] = useState(false);

  const testStats = [
    {
      title: 'Total Properties',
      value: 24,
      subtitle: '3 new this month',
      icon: Building2,
      color: 'blue',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Active Tenants',
      value: 18,
      subtitle: '2 pending applications',
      icon: Users,
      color: 'green',
      trend: 'up',
      trendValue: '+5%'
    },
    {
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
      title: 'Occupancy Rate',
      value: '92%',
      subtitle: 'Above average',
      icon: TrendingUp,
      color: 'purple',
      trend: 'up',
      trendValue: '+3%'
    }
  ];

  const handleCardClick = (stat) => {
    alert(`Clicked: ${stat.title} - ${stat.value}`);
  };

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">StatCard Test</h1>
          <p className="text-gray-600">Testing StatCard and StatGrid components</p>
        </div>

        {/* Basic StatGrid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">StatGrid Test</h2>
          <StatGrid 
            stats={testStats}
            columns={4}
            loading={loading}
            onCardClick={handleCardClick}
          />
          <button
            onClick={handleLoadingTest}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Test Loading (2s)
          </button>
        </section>

        {/* Individual StatCards */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Individual StatCards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Default Card" 
              value="1,234" 
              icon={Building2}
              color="blue"
            />
            <StatCard 
              title="With Currency" 
              value={50000} 
              icon={DollarSign}
              color="yellow"
              showCurrency={true}
            />
            <StatCard 
              title="With Trend" 
              value="98%" 
              icon={TrendingUp}
              color="green"
              trend="up"
              trendValue="+5%"
            />
          </div>
        </section>

        {/* Different Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Variants Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Default" 
              value="100" 
              icon={Building2}
              color="blue"
              variant="default"
            />
            <StatCard 
              title="Minimal" 
              value="200" 
              icon={Users}
              color="green"
              variant="minimal"
            />
            <StatCard 
              title="Bordered" 
              value="300" 
              icon={DollarSign}
              color="yellow"
              variant="bordered"
            />
            <StatCard 
              title="Gradient" 
              value="400" 
              icon={TrendingUp}
              color="purple"
              variant="gradient"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default StatCardTest;
