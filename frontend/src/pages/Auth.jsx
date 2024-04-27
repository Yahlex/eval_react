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
    navigate('/inscription-artisan');
  };

  return (
    <>
      {
        isRegister
          ? <RegisterForm />
          : <LoginForm />
      }
      <a onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
      </a>
      <br />
      <a onClick={handleArtisanRegistration}>
        Je veux m'inscrire en tant qu'artisan
      </a>
    </>
  )
}

export default Auth
