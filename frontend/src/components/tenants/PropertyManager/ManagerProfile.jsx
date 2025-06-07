import React from 'react';
import { Star, Phone, Mail, MessageCircle, User } from 'lucide-react';

const ManagerProfile = ({ manager }) => {
  const renderStars = (rating, total) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    const remainingStars = total - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }
    
    return stars;
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'message':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Phone className="w-4 h-4" />;
    }
  };

  const getContactColor = (type) => {
    switch (type) {
      case 'call':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'email':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
      case 'message':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4 mb-6">
        <User className="w-6 h-6 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Manager Profile</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Manager Info */}
        <div className="space-y-6">
          {/* Manager Details */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{manager.name}</h3>
              <p className="text-gray-600">{manager.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {renderStars(manager.rating, manager.totalRating)}
                </div>
                <span className="text-sm text-gray-600">{manager.rating}/5.0</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{manager.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{manager.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-sm">⏱️ Avg Response: {manager.avgResponse}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-sm">🏢 Managing {manager.managingProperties} properties</span>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Languages</h4>
            <div className="flex gap-2">
              {manager.languages.map((language, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Availability & Contact */}
        <div className="space-y-6">
          {/* Availability */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Availability</h4>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm font-medium text-green-800 mb-1">
                {manager.availability.schedule}
              </p>
              <p className="text-xs text-green-600">
                {manager.availability.emergencySupport}
              </p>
            </div>
          </div>

          {/* Contact Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Options</h4>
            <div className="flex gap-2">
              {manager.contactOptions.map((option, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${getContactColor(option.type)}`}
                >
                  {getContactIcon(option.type)}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
