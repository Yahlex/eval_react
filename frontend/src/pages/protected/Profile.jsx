// Profile.jsx
import { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { Button, Input } from '@nextui-org/react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile () {
  const { state: { user, jwt }, updateUser, logout } = useAuth()

  // State pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password// ajout du champ password pour éviter erreur de validation si champ vide
  })

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Supprime le champ du mot de passe s'il est vide
      const dataToUpdate = { ...formData }
      if (dataToUpdate.password === '') {
        delete dataToUpdate.password
      }
      // Envoyer les données mises à jour à updateUser
      await updateUser(formData)
      toast.success('Informations mises à jour avec succès')
      logout()
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la mise à jour des informations')
    }
  }
  const handleSuppress = async () => {
    try {
      // Demander confirmation avant la suppression du compte
      const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')
      if (confirmDelete) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        })
        toast.success('Votre compte a été supprimé avec succès.')
        logout()
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la suppression du compte.')
    }
  }
  // annuler modifications
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/dashboard')
  };

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Profil de {user.username}</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='username'
          label='Nom d utilisateur'
          value={formData.username}
          onChange={handleChange}
          className='w-full'
        />
        <Input
          name='email'
          label='Adresse e-mail'
          type='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full'
        />
        <Input
          name='password'
          label='Nouveau mot de passe'
          type='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full'
        />
        <div className='flex justify-between items-center'>
          <Button type='submit' color='primary' className='mr-4 px-6 '>
            Enregistrer les modifications
          </Button>
          <Button onClick={handleCancel} color='warning' className='mr-4 px-4'>Annuler</Button>

          <Button onClick={handleSuppress} color='danger' className='px-6'>Supprimer mon compte</Button>

        </div>
      </form>
    </div>

  )
}

export default Profile
