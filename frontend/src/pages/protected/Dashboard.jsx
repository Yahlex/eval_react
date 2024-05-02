import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Button } from '@nextui-org/react';
import UserProfile from '../../components/user/UserProfile';
import { useFetchAuth } from '../../hooks/Api';
import ArtisanProfile from '../../components/user/ArtisanProfile';
import ArtisanCreateForm from '../../components/forms/ArtisanCreateForm';
import ProductsListDashboard from '../../components/products/ProductsListDashboard';

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

  const handleCreateNewProduct = () => {
    navigate('/create-product'); 
  };

  return (
    <>
<div className="container mx-auto px-4 py-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">DASHBOARD</h2>
    
    <div className="space-y-4">
        <UserProfile />

        {isArtisan ? <ArtisanProfile attributes={response?.artisan}/> : null}

        {!isArtisan && showArtisanCreateForm && <ArtisanCreateForm />}

        {!isArtisan && !showArtisanCreateForm && (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleCreateArtisan}>
                Créer ma page Artisan
            </Button>
        )}

        {isArtisan && <ProductsListDashboard artisanId={response.artisan.id} />}

        {isArtisan && (
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handleCreateNewProduct}>
                Créer un nouveau produit
            </Button>
        )}

        <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
            Se déconnecter
        </Button>

        <Button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleModifierUser}>
            Modifier mon profil utilisateur
        </Button>
    </div>
</div>

    </>
  );
}

export default Dashboard;
