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
      <div className='flex flex-col items-center justify-center'>
        <Input
          clearable
          bordered
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          clearable
          bordered
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <Textarea
          bordered
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="my-3"
        />
        <Button onClick={handleSubmit}>Create Product</Button>
        <Button auto flat color="error" onClick={handleCancel}>Cancel</Button>
      </div>
    </>
  );
}

export default CreateNewProduct;
