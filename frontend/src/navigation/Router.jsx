import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

/* Pages */
import About from '../pages/About'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Artisans from '../pages/Artisans'
import Home from '../pages/Home'
import Artisan from '../pages/Artisan'
import Auth from '../pages/Auth'
import Dashboard from '../pages/protected/Dashboard'
import PrivateRoute from './PrivateRouteMiddleware'
import Register from '../pages/Register'
import Profile from '../pages/protected/Profile'
import CreateNewProduct from '../components/products/CreateNewProduct'
import UpdateProduct from '../components/products/UpdateProduct'

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='artisans'>
          <Route index element={<Artisans />} /> {/* Route <domaine>/artisans */}
          <Route path=':artisanSlug' element={<Artisan />} /> {/* Route <domaine>/artisans/<ID> */}
        </Route>
        <Route path='about' element={<About />} />
        <Route path='services' element={<Services />} />
        <Route path='contact' element={<Contact />} />
        <Route path='authentication' element={<Auth />} />
        <Route path='register' element={<Register />} />
        <Route path="create-product" element={<CreateNewProduct />} />
        <Route path="update-product/:productId" element={<UpdateProduct />} />
        <Route path='dashboard' element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='profile' element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
