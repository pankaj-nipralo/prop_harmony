import { User, Camera, Key, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileSettings = ({
  profileData,
  setProfileData,
  setPasswordChangeModal,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

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

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={profileData.address}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            value={profileData.company}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                company: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:ml-auto">
            <button
              onClick={() => setPasswordChangeModal(true)}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
