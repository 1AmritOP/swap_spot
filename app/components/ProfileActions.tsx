// components/ProfileActions.jsx
'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

const ProfileActions = () => {
  return (
    <div className="flex flex-col gap-3 w-full mt-6">
      {/* Your Products Button */}
      <Link 
        href="/my-products" 
        className="w-full text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Your Products
      </Link>

      {/* Sign Out Button */}
      <button 
        onClick={() => signOut({ callbackUrl: '/' })}
        className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
      >
        Sign Out
      </button>
    </div>
  )
}

export default ProfileActions