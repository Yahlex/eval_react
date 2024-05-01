import { createContext, useContext, useEffect, useReducer } from 'react'
import { loginApi, registerApi, updateUserApi} from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN', // Connecté avec succès
  REGISTER: 'REGISTER', // Inscrit + connecté avec succès
  LOGOUT: 'LOGOUT', // Déconnecté
  LOADING: 'LOADING', // Chargement
  ERROR: 'ERROR', // Erreur
  RESET: 'RESET', // Réinitialisation de l'état
  UPDATE_USER: 'UPDATE_USER' // Mise à jour de l'utilisateur
}

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null
}

/**
 * @param prevState Etat précédent l'action
 * @param action Action pour mettre à jour l'état = { type, data? = { jwt, user, error } }
 */
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        isLoggedIn: true,
        loading: false,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        isLoggedIn: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState, // Recopie de l'état précédent
        loading: true
      }
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState
    case actionTypes.UPDATE_USER: // Gérer la mise à jour de l'utilisateur
      return {
        ...prevState,
        user: action.data.user,
        loading: false,
        error: null
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

  // *
const authFactory = (dispatch) => ({
  // credentials = { identifier, password }
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Identfiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  },
  //* Ajout de register
  register: async (userData) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(userData)
      dispatch({
        type: actionTypes.REGISTER,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Identfiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },

  //* Ajout de updateUser
  updateUser: async (userData) => {
    dispatch({ type: actionTypes.LOADING });
    try {
      const result = await updateUserApi(userData); // Appeler updateUserApi
      dispatch({
        type: actionTypes.UPDATE_USER,
        data: {
          user: result.user,
          jwt: result.jwt,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: "Erreur lors de la mise à jour de l'utilisateur",
        },
      });
    }
  },

});


const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export {
  AuthProvider,
  useAuth
}
