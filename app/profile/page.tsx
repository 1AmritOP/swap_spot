// app/profile/page.jsx (or wherever your page is)
import { getUserDetails } from '@/lib/data'
import React from 'react'
import ProfileActions from '../components/ProfileActions';

const page = async () => {
  const userData = await getUserDetails("amritop");

  if (!userData) {
    return <div className="p-10 text-center">User not found</div>
  }

  const joinedDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="px-6 pb-8">
          {/* Avatar Image - Centered and overlapping the header */}
          <div className="relative -mt-16 mb-4 flex justify-center">
            <div className="h-32 w-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <img 
                src={`https://ui-avatars.com/api/?name=${userData.name}&background=random&size=128`} 
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {userData.name}
            </h1>
            <p className="text-gray-500 font-medium">@{userData.username}</p>
            <p className="text-xs text-gray-400 mt-2">
              Member since {joinedDate}
            </p>
          </div>

          {/* User Details Card */}
          <div className="bg-gray-50 rounded-lg p-4 mb-2 text-sm text-gray-600">
            <div className="flex justify-between py-1 border-b border-gray-200">
              <span>User ID:</span>
              <span className="font-mono text-gray-800">{userData._id.toString().slice(-6)}...</span>
            </div>
            <div className="flex justify-between py-1 pt-2">
              <span>Status:</span>
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active
              </span>
            </div>
          </div>

          {/* Buttons Component */}
          <ProfileActions />
          
        </div>
      </div>
    </div>
  )
}

export default page