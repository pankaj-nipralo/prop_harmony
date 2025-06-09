import React, { useState } from 'react';
import { XCircle, FileText, Download, Calendar, DollarSign, Building, User, CheckCircle } from 'lucide-react';

const ContractViewModal = ({ 
  showModal, 
  application, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!showModal || !application) return null;

  // Sample contract data
  const contractData = {
    contractNumber: 'LC-2025-001',
    startDate: '2025-02-01',
    endDate: '2026-01-31',
    monthlyRent: application.rent,
    securityDeposit: 'AED 5,000',
    brokerageFee: 'AED 2,500',
    landlordName: 'Ahmed Al Mansouri',
    landlordPhone: '+971 50 123 4567',
    landlordEmail: 'ahmed.mansouri@email.com',
    terms: [
      'Rent is due on the 1st of each month',
      'Security deposit will be returned within 30 days of lease termination',
      'Tenant is responsible for utilities (electricity, water, internet)',
      'No pets allowed without prior written consent',
      'Property must be maintained in good condition',
      'Subletting requires landlord approval',
      '30 days notice required for lease termination'
    ],
    status: 'Ready for Signature',
    generatedDate: '2025-01-20'
  };

  const handleDownload = () => {
    // Simulate contract download
    alert('Contract download started. You will receive the PDF document shortly.');
  };

  const handleSign = () => {
    // Simulate digital signature process
    alert('Digital signature process initiated. You will be redirected to the signing platform.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] border-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Lease Contract - {application.name}
              </h3>
              <p className="text-sm text-gray-600">Contract #{contractData.contractNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-blue-500 transition-colors border border-blue-500 rounded-lg myButton hover:bg-blue-50"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button 
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'terms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveTab('parties')}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'parties'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Parties
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Property Details */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold text-gray-900">Property Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Property:</span>
                    <p className="font-medium">{application.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <p className="font-medium">{application.address}</p>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold text-gray-900">Financial Terms</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Monthly Rent:</span>
                    <p className="font-medium text-green-600">{contractData.monthlyRent}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Security Deposit:</span>
                    <p className="font-medium">{contractData.securityDeposit}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Brokerage Fee:</span>
                    <p className="font-medium">{contractData.brokerageFee}</p>
                  </div>
                </div>
              </div>

              {/* Lease Period */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <h4 className="font-semibold text-gray-900">Lease Period</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Start Date:</span>
                    <p className="font-medium">{contractData.startDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">End Date:</span>
                    <p className="font-medium">{contractData.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="p-4 rounded-lg bg-green-50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-800">{contractData.status}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="mb-4 font-semibold text-gray-900">Terms and Conditions</h4>
              <div className="space-y-3">
                {contractData.terms.map((term, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-medium text-white bg-blue-500 rounded-full">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{term}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="space-y-6">
              {/* Landlord */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold text-gray-900">Landlord</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">{contractData.landlordName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium">{contractData.landlordPhone}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">{contractData.landlordEmail}</p>
                  </div>
                </div>
              </div>

              {/* Tenant */}
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold text-gray-900">Tenant</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium">Pankaj Gupta</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium">+971 50 987 6543</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">pankaj.gupta@email.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Contract generated on {contractData.generatedDate}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg myButton hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={handleSign}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600"
            >
              <CheckCircle className="w-4 h-4" />
              Sign Contract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractViewModal;
