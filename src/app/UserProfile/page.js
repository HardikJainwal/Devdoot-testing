'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/api/auth';
import { 
  User, 
  Phone, 
  Camera, 
  Save, 
  HelpCircle, 
  Wallet, 
  Activity, 
  Tag,
  Shield,
  Settings,
  Heart,
  Users,
  UserPlus,
  AlertTriangle,
  LogOut,
  ChevronRight,
  Edit2,
  Check,
  X
} from 'lucide-react';

const ProfilePage = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: null
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [imageLoading, setImageLoading] = useState(false);

  // Function to upload profile image
  const uploadProfileImage = async (file) => {
    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append('profileImage', file);
      
      const token = authUtils.getToken();
      const response = await fetch('/api/profile-pictures', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload response:', result);
        
        // The response should contain the imageUrl
        const imageUrl = result.imageUrl || result.data?.imageUrl || result.url;
        
        if (imageUrl) {
          // Update local storage with new image URL
          const user = authUtils.getUser();
          const updatedUser = { ...user, profileImage: imageUrl };
          authUtils.setUser(updatedUser);
          console.log('Updated user data with image:', updatedUser);
          
          return imageUrl;
        } else {
          console.error('No imageUrl in response:', result);
          throw new Error('No image URL returned from server');
        }
      }
      throw new Error(`Upload failed with status: ${response.status}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setImageLoading(false);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = authUtils.getUser();
        console.log('User data from localStorage:', user);
        
        if (user) {
          const userData = {
            name: user.firstName && user.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user.firstName || user.lastName || user.name || user.fullName || '',
            email: user.email || '',
            phone: user.phone || '',
            profileImage: user.profileImage || null
          };

          console.log('Mapped user data:', userData);
          setProfileData(userData);
          setEditData(userData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadUserData, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
          setEditData({ ...editData, profileImage: e.target.result });
        };
        reader.readAsDataURL(file);

        // Upload to server
        const imageUrl = await uploadProfileImage(file);
        
        // Update with server URL
        setEditData(prev => ({ ...prev, profileImage: imageUrl }));
        setProfileData(prev => ({ ...prev, profileImage: imageUrl }));
        
      } catch (error) {
        console.error('Error uploading image:', error);
        // You might want to show an error message to the user
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const menuItems = [
    {
      icon: HelpCircle,
      title: 'Help',
      description: 'Get support and FAQs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      route: '/help'
    },
    {
      icon: Wallet,
      title: 'Wallet',
      description: 'Manage your payments',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      route: '/wallet'
    },
    {
      icon: Activity,
      title: 'Activity',
      description: 'View your recent activity',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      route: '/activity'
    }
  ];

  const serviceItems = [
    {
      icon: Tag,
      title: 'Apply Promo Code',
      description: 'View and apply available codes',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      route: '/promo-codes',
      badge: '3 available'
    },
    {
      icon: Shield,
      title: 'Safety Checkup',
      description: 'Security and safety settings',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      route: '/safety'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'App preferences and privacy',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      route: '/settings'
    },
    {
      icon: Heart,
      title: 'Insurance',
      description: 'Manage your coverage',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      route: '/insurance'
    },
    {
      icon: Users,
      title: 'Become a Member',
      description: 'Join our premium membership',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      route: '/membership'
    },
    {
      icon: UserPlus,
      title: 'Earn by becoming a Care Giver',
      description: 'Start earning with us',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      route: '/become-caregiver'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Contacts',
      description: 'Manage emergency contacts',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      route: '/emergency-contacts'
    }
  ];

  const handleNavigation = (route) => {
    router.push(route);
  };

  const handleLogout = () => {
    authUtils.clearAuth();   
    router.push("/");   
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold mb-2">Profile</h1>
          <p className="text-teal-100">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
              >
                <Edit2 size={16} />
                <span className="text-sm font-medium">Edit</span>
              </button>
            )}
          </div>

          <div className="flex flex-col items-center space-y-4">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center overflow-hidden">
                {imageLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                ) : (isEditing ? editData.profileImage : profileData.profileImage) ? (
                  <img
                    src={isEditing ? editData.profileImage : profileData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-white" />
                )}
              </div>
              {isEditing && !imageLoading && (
                <label className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-colors shadow-lg">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="text-lg font-semibold text-gray-800 text-center">
                  {profileData.name || 'Not provided'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="text-gray-600 text-center">
                  {profileData.email || 'Not provided'}
                </div>
              </div>
            </div>

            {/* Edit Controls */}
            {isEditing && (
              <div className="flex space-x-3 w-full">
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Check size={16} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.route)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${item.bgColor}`}>
                  <item.icon size={24} className={item.color} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Services & Settings */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Services & Settings</h3>
        <div className="grid grid-cols-1 gap-3">
          {serviceItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.route)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${item.bgColor}`}>
                  <item.icon size={24} className={item.color} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    {item.badge && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 mt-8 mb-6">
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-red-50">
              <LogOut size={24} className="text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-red-600">Logout</h4>
              <p className="text-sm text-gray-600">Sign out of your account</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;