// components/tenant-settings/SettingsNav.jsx
import React from "react";

const SettingsNav = ({ sections, activeSection, setActiveSection }) => {
  return (
    <nav className="space-y-2">
      {sections.map((section) => {
        const IconComponent = section.icon;
        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
              activeSection === section.id
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <IconComponent size={18} />
            <div className="flex-1">
              <span className="block text-sm font-medium">{section.name}</span>
              <span className="block text-xs opacity-75">
                {section.description}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export default SettingsNav;