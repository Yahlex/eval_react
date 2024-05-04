import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/forms/RegisterForm'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../contexts/authContext'

function Auth () {
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const { state: { jwt, user } } = useAuth()

  useEffect(() => {
    if (jwt && user) {
      navigate('/dashboard')
    }
  }, [])

  const handleArtisanRegistration = () => {
    navigate('/inscription-artisan')
  }

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
          {
      isRegister
        ? <RegisterForm />
        : <LoginForm />
    }
          <div className='text-center mt-4'>
            <button
              className='text-blue-500 hover:text-blue-700 underline'
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
            </button>
          </div>
          <div className='text-center mt-2'>
            <button
              className='text-green-500 hover:text-green-700 underline'
              onClick={handleArtisanRegistration}
            >
              Je veux m'inscrire en tant qu'artisan
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Auth
