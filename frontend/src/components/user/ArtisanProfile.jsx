import React from 'react';
import PropTypes from 'prop-types';
import { useFetchAuth } from '../../hooks/Api';

function ArtisanProfile({ attributes }) {
  // Utilisez useFetchAuth ou tout autre moyen pour récupérer les données de l'artisan
  const { response: artisanData, isLoading, error } = useFetchAuth('/users/me?populate=artisan')
  const imgUrl =
  process.env.REACT_APP_IMAGES_URL + attributes.profilePicture?.url

  // Vérifiez s'il y a une erreur ou si les données sont en cours de chargement
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite: {error.message}</div>;
  }

  // Assurez-vous que artisanData est disponible avant de l'utiliser
  if (!artisanData) {
    return <div>Aucune donnée disponible pour l'artisan</div>;
  }

  // Affichez les données de l'artisan dans une card Tailwind CSS
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={imgUrl} alt="Profile" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Artisan</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{attributes.name}</p>
          <p className="mt-2 text-gray-500">{attributes.email}</p>
          {/* Ajoutez d'autres données de l'artisan ici si nécessaire */}
        </div>
      </div>
    </div>
  );
}

ArtisanProfile.propTypes = {
    attributes: PropTypes.object
  }
  

export default ArtisanProfile;



