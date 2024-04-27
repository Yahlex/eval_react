import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { Button } from '@nextui-org/react'
import UserProfile from '../../components/user/UserProfile'
import { useFetchAuth } from '../../hooks/Api'
import ArtisanProfile from '../../components/user/ArtisanProfile'

function Dashboard () {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const { response } = useFetchAuth('/users/me?populate=artisan.profilePicture')

  const isArtisan = response?.artisan

  console.log("bonjour",response);

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  return (
    <>
      <h2>DASHBOARD</h2>
      <UserProfile />
      {isArtisan ? <ArtisanProfile attributes={response[0]?.attributes}/> : null}
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
    </>
  )
}

export default Dashboard
