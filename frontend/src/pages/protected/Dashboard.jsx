import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { Button } from '@nextui-org/react'
import UserProfile from '../../components/user/UserProfile'

function Dashboard () {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  return (
    <>
      <h2>DASHBOARD</h2>
      <UserProfile />
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
    </>
  )
}

export default Dashboard
