"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, user } = useUser();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <nav className="w-full flex justify-end p-4 gap-4">
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </SignUpButton>
          </>
        )}
      </nav>
      {isSignedIn && user && (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={user.imageUrl} 
              alt="Profile" 
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">{user.fullName || 'No name set'}</p>
              <p className="text-gray-600">{user.emailAddresses[0]?.emailAddress || 'No email'}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>First Name: {user.firstName || 'Not provided'}</p>
            <p>Last Name: {user.lastName || 'Not provided'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
