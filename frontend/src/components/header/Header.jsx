import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import { useState } from 'react'
import { useAuth } from '../../contexts/authContext.jsx'

function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { state: { isLoggedIn, user }, logout } = useAuth()

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link href='/'>
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/artisans'>
            Artisans
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about'>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/services'>
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/contact'>
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      {
        isLoggedIn
          ? (
            <NavbarContent as='div' justify='end'>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='primary'
                    name='Jason Hughes'
                    size='sm'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' as='a' href='/profile' color='primary'>
                    <p className='font-semibold'>Connecté en tant que</p>
                    <p className='font-normal text-sm'>{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key='dashboard' as='a' href='/dashboard' color='success'>
                    Voir mon dashboard
                  </DropdownItem>
                  <DropdownItem key='logout' color='danger' onPress={logout}>
                    Déconnexion
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
            )
          : (
            <NavbarContent justify='end'>
              <NavbarItem className='hidden lg:flex'>
                <Link href='/register'>Sign up</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='/authentication' variant='flat'>
                  Login
                </Button>
              </NavbarItem>
            </NavbarContent>
            )
      }

      <NavbarMenu>
        <NavbarMenuItem>
          <Link Link href='/'>
            Accueil
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/services'>
            Services
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/about'>
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/artisans'>
            Artisans
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link Link href='/contact'>
            Contact
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
