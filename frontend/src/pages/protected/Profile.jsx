// Profile.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import axios from 'axios';

function Profile() {
  const { state: { user, jwt }, updateUser, logout } = useAuth();

  // State pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    id : user.id,
    username: user.username,
    email: user.email,
    password: user.password,// ajout du champ password pour éviter erreur de validation si champ vide
  });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Supprime le champ du mot de passe s'il est vide
    const dataToUpdate = { ...formData };
    if (dataToUpdate.password === '') {
      delete dataToUpdate.password;
    }
      // Envoyer les données mises à jour à updateUser
      await updateUser(formData);
      toast.success('Informations mises à jour avec succès');
      logout();
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour des informations');
    }
  };
      // Supprime le compte utilisateur
  const handleSuppress = async () => {
    async function suppressUser () {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      return response
    }
    const response = await suppressUser()
    if (response.status === 200) {
      toast.success('Votre compte a été supprimé avec succès !')
      logout()
    } else {
      console.log(response)
      toast.error('Erreur lors de la suppression de votre compte')
    }
  }

  return (
    <div>
      <h2>Profil de {user.username}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name='username'
          label='Nom d utilisateur'
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          name='email'
          label='Adresse e-mail'
          type='email'
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name='password'
          label='Nouveau mot de passe'
          type='password'
          value={formData.password}
          onChange={handleChange}
        />
        <Button type='submit'>Enregistrer les modifications</Button>
        <a onClick={() => handleSuppress()} className='text-red-400'>
        Supprimer mon compte
      </a>
      </form>
    </div>
  );
}

export default Profile;
