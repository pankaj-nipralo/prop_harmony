import React from 'react';
import { HelpCircle } from 'lucide-react';

const NeedHelpSection = ({ helpData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">{helpData.title}</h2>
      </div>
      
      <div className="space-y-4">
        {helpData.faqs.map((faq) => (
          <div key={faq.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              {faq.question}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedHelpSection;
