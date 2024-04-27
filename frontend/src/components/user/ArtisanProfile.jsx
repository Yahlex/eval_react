import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function ArtisanProfile ({ artisan }) {
  const navigate = useNavigate()

  // Vérifie si l'artisan a une image de profil
  const imageUrl = artisan.profilePicture?.url 
    ? `${process.env.REACT_APP_BASE_URL}${artisan.profilePicture.url}`
    : null

  // Fonction pour naviguer vers le profil complet de l'artisan
  const handleShopLink = () => {
    navigate(`/artisans/${artisan.slug}`)
  }

  return (
    <Card className='flex flex-col items-center w-1/3'>
      <CardHeader className='flex flex-col items-center font-semibold'>
        Votre profil d'artisan :
        <h1>{artisan.name}</h1>
      </CardHeader>
      <CardBody className='w-80'>
        {imageUrl && <img src={imageUrl} alt="Profile" className='artisan-pp rounded-md' />}
      </CardBody>
      <CardFooter className='flex flex-col text-center gap-4 p-8'>
        <p>{artisan.description}</p>
        <a onClick={handleShopLink}>Voir mon shop</a>
      </CardFooter>
    </Card>
  )
}

ArtisanProfile.propTypes = {
  artisan: PropTypes.object.isRequired
}

export default ArtisanProfile
