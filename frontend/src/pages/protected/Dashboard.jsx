import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Button } from '@nextui-org/react';
import UserProfile from '../../components/user/UserProfile';
import { useFetchAuth } from '../../hooks/Api';
import ArtisanProfile from '../../components/user/ArtisanProfile';
import ArtisanCreateForm from '../../components/forms/ArtisanCreateForm';

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { response } = useFetchAuth('/users/me?populate=artisan.profilePicture');
  const isArtisan = response?.artisan;

  const [showArtisanCreateForm, setShowArtisanCreateForm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/authentication');
  };

  const handleModifierUser = () => {
    navigate('/profile');
  };

  const handleCreateArtisan = () => {
    setShowArtisanCreateForm(true);
  };

  return (
    <>
      <h2>DASHBOARD</h2>
      <UserProfile />
      {isArtisan ? <ArtisanProfile attributes={response?.artisan}/> : null}
      {!isArtisan && showArtisanCreateForm && <ArtisanCreateForm />}
      {!isArtisan && !showArtisanCreateForm && (
        <Button onClick={handleCreateArtisan}>
          Créer ma page Artisan
        </Button>
      )}
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
      <Button onClick={handleModifierUser}>
        Modifier mon profil utilisateur
      </Button>
    </>
  );
}

export default Dashboard;
