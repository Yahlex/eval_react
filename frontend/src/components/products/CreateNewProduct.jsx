import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateNewProduct() {
  const { state: { jwt, user } } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    artisan: '',
    images: []
  });

  const [fileFormData, setFileFormData] = useState(new FormData());

  useEffect(() => {
    async function fetchArtisan() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}?populate=artisan`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        if (response.data && response.data.artisan) {
          setFormData(formData => ({ ...formData, artisan: response.data.artisan.id }));
        }
      } catch (error) {
        console.error('Failed to fetch artisan:', error);
        toast.error('Failed to fetch artisan details.');
      }
    }
    if (user.id) fetchArtisan();
  }, [user.id, jwt]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      const updatedFileFormData = new FormData();
      Array.from(files).forEach(file => {
        updatedFileFormData.append('files', file);
      });
      setFileFormData(updatedFileFormData);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageIds = [];
      if (fileFormData.has('files')) {
        const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, fileFormData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        imageIds = uploadResponse.data.map(file => file.id);
      }

      const productData = {
        data: {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          images: imageIds,
          artisan: formData.artisan
        }
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Product created successfully');
        navigate('/dashboard');
      } else {
        toast.error(`Failed to create product: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard'); // Redirects user to the dashboard
  };

  return (
    <>
<div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
  <Input
    clearable
    bordered
    label="Nom"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="mb-4"
  />
  <Input
    clearable
    bordered
    label="Prix"
    type="number"
    name="price"
    value={formData.price}
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
    multiple
    onChange={handleFileChange}
    className="file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              mb-4 w-full cursor-pointer"
  />
  <div className="flex justify-between items-center">
    <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Créer nouveau produit
    </Button>
    <Button auto flat color="error" onClick={handleCancel} className="ml-4">
      Annuler
    </Button>
  </div>
</div>

    </>
  );
}

export default CreateNewProduct;
