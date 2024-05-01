import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { createArtisanApi } from '../../services/api';
import { useAuth } from '../../contexts/authContext';

const ArtisanCreateForm = () => {
  const { state: { user } } = useAuth(); // Récupérer l'utilisateur connecté depuis le contexte d'authentification

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    profilePicture: '',
    slug: '', // Supprimé le champ slug de l'état local
    products: [], // Initialiser products à une valeur vide
    user: user ? user.id : ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    try {
      // Envoyer l'image à Strapi
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data[0]?.url) {
        setFormData({
          ...formData,
          profilePicture: data[0].url
        });
      } else {
        toast.error('Erreur lors du téléchargement de l\'image');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du téléchargement de l\'image');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Générer le slug à partir du nom de l'artisan
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      await createArtisanApi({ ...formData, slug });
      toast.success('Artisan créé avec succès');
      // Réinitialiser le formulaire après la création réussie
      setFormData({
        name: '',
        description: '',
        profilePicture: '',
        products: [],
        user: user ? user.id : ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la création de l\'artisan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un nouvel artisan :</h2>
      <Input
        name='name'
        label='Nom de l\artisan : '
        placeholder='Entrez le nom de l\artisan...'
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name='description'
        label='Description de l\artisan : '
        placeholder='Entrez la description de l\artisan...'
        value={formData.description}
        onChange={handleChange}
      />
      <Input
        name='profilePicture'
        label='Image de profil de l\artisan : '
        type='file' // Utiliser le type 'file' pour permettre le téléchargement de l'image
        onChange={handleImageUpload}
      />
      {/* Supprimer le champ slug de l'interface utilisateur */}
      {/* Supprimer le champ products de l'interface utilisateur */}
      <Button type='submit' color='primary'>
        Créer l'artisan
      </Button>
    </form>
  );
};

export default ArtisanCreateForm;
