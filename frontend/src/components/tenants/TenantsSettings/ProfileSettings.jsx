
import { User, Camera, Key, MapPin } from "lucide-react";
import PasswordChangeModal from "./PasswordChangeModal";

const ProfileSettings = ({
  profileData,
  setProfileData,
  securitySettings,
  setPasswordChangeModal,
}) => {
  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
            {profileData.profilePicture ? (
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="object-cover w-20 h-20 rounded-full"
              />
            ) : (
              <User className="w-10 h-10 text-blue-600" />
            )}
          </div>
          <button className="absolute p-1 text-white transition-colors bg-blue-600 rounded-full -bottom-1 -right-1 hover:bg-blue-700">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Profile Picture</h4>
          <p className="text-sm text-gray-600">Upload a professional photo</p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
            Change Photo
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="p-4 rounded-lg bg-gray-50">
        <h4 className="mb-4 text-sm font-semibold text-gray-900">
          Emergency Contact
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              value={profileData.emergencyContact.name}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  emergencyContact: {
                    ...prev.emergencyContact,
                    name: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Relationship
            </label>
            <select
              value={profileData.emergencyContact.relationship}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  emergencyContact: {
                    ...prev.emergencyContact,
                    relationship: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Spouse">Spouse</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.emergencyContact.phone}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  emergencyContact: {
                    ...prev.emergencyContact,
                    phone: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">Password</h4>
              <p className="text-xs text-gray-500">
                Last changed: {securitySettings.passwordLastChanged}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPasswordChangeModal(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200 myButton"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;