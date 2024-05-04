import { useState, useEffect } from 'react'
import { validateRegisterForm } from '../../services/formAuthValidation'
import { toast } from 'react-toastify'
import { Button, Input } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'

function RegisterForm () {
  // Version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null
  })

  const [formData, setFormData] = useState({
    username: 'Testoxi',
    email: 'tooto@toto.fr',
    password: 'toto44'
  })

  const { register } = useAuth()

  const navigate = useNavigate()

  const { state: { user, jwt } } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (_errors) {
      setErrors(_errors)
    } else {
      toast.info(`Formulaire soumis : ${formData.username} ${formData.email}`)
    }
    register(formData)
  }

  console.log(formData)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>Merci de vous inscrire avec votre adresse mail :</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Input
              clearable
              bordered
              label="Nom d'utilisateur :"
              placeholder="Entrez votre nom d'utilisateur..."
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='w-full'
            />
          </div>
          <div className='mb-4'>
            <Input
              clearable
              bordered
              label='Email :'
              placeholder='Entrez votre adresse email...'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full'
            />
          </div>
          <div className='mb-6'>
            <Input
              clearable
              bordered
              label='Mot de passe :'
              placeholder='Entrez un mot de passe...'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full'
            />
          </div>
          <Button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full'>
            S'enregistrer
          </Button>
        </form>
      </div>
    </div>

  )
}

export default RegisterForm
