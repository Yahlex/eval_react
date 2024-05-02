import React, { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ArtisanCreateForm() {
  const { state: { user, jwt } } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    profilePicture: null
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, profilePicture: event.target.files[0] });
  };

  const handleSubmit = async () => {
    const formDataWithImage = new FormData();
    if (formData.profilePicture) {
      formDataWithImage.append('files.profilePicture', formData.profilePicture); // Assurez-vous que le nom correspond
    }
    formDataWithImage.append('data', JSON.stringify({
      name: formData.name,
      description: formData.description,
      user: user.id
    }));
  
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/artisans`,
        data: formDataWithImage,
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        toast.success('Artisan créé avec succès');
        // navigate('/dashboard'); // Redirection vers le dashboard après la création réussie
        window.location.reload(); // Recharger la page pour voir les changements
      } else {
        toast.error(`Failed to create artisan: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating artisan:', error);
      toast.error('Error creating artisan.');
    }
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <Input
        clearable
        bordered
        label="Nom de l'artisan"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="mb-4"
      />
      <Textarea
        bordered
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="mb-4"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  mb-4 w-full cursor-pointer"
      />
      <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Créer l'artisan
      </Button>
    </div>
  );
}

export default ArtisanCreateForm;
