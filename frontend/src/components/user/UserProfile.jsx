import React from 'react';
import { useAuth } from '../../contexts/authContext';



function UserProfile() {
  const { state: { user } } = useAuth();

  return (  
  <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil de {user.username}</h2>
    <p className="text-md text-gray-700 mb-1"><span className="font-semibold">Nom d'utilisateur:</span> {user.username}</p>
    <p className="text-md text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
  </div>
  );

  
}

export default UserProfile;
