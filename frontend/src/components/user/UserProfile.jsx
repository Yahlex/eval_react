import React from 'react';
import { useAuth } from '../../contexts/authContext';

function UserProfile() {
  const { state: { user } } = useAuth();

  return (
    <div>
      <h2>Profil de {user.username}</h2>
      <p>Nom d'utilisateur: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
