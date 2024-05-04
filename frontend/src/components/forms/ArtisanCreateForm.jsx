import React, { useState } from 'react'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function ArtisanCreateForm () {
  const { state: { user, jwt } } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    profilePicture: null,
    slug: ''
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleFileChange = (event) => {
    setFormData({ ...formData, profilePicture: event.target.files[0] })
  }

  const handleCancel = () => {
    window.location.reload() // Recharge la page actuelle
  }

  const handleSubmit = async () => {
    // Générer le slug à partir du name de formData (donc de l'artisan créer)
    const generateSlug = name => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')
    const myslug = generateSlug(formData.name)

    const formDataWithImage = new FormData()
    if (formData.profilePicture) {
      formDataWithImage.append('files.profilePicture', formData.profilePicture)
    }
    formDataWithImage.append('data', JSON.stringify({
      name: formData.name,
      description: formData.description,
      user: user.id,
      slug: myslug
    }))

    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/artisans`,
        data: formDataWithImage,
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status === 200) {
        toast.success('Artisan créé avec succès')
        // navigate('/dashboard'); // Redirection vers le dashboard après la création réussie
        window.location.reload() // Recharger la page pour voir les changements
      } else {
        toast.error(`Failed to create artisan: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error creating artisan:', error)
      toast.error('Error creating artisan.')
    }
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <Input
        clearable
        bordered
        label="Nom de l'artisan"
        name='name'
        value={formData.name}
        onChange={handleChange}
        className='mb-4'
      />
      <Textarea
        bordered
        label='Description'
        name='description'
        value={formData.description}
        onChange={handleChange}
        className='mb-4'
      />

      <input
        type='file'
        onChange={handleFileChange}
        className='file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  mb-4 w-full cursor-pointer'
      />
      <div className='flex items-center'>
        <Button onClick={handleSubmit} color='primary' className=' py-2 px-4 rounded mr-6'>
          Créer l'artisan
        </Button>
        <Button onClick={handleCancel} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'>
          Annuler
        </Button>
      </div>
    </div>
  )
}

export default ArtisanCreateForm
