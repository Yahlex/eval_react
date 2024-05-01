import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * Call API Login route
 * @param {object} credentials { identifier, password }
 * @return {object} { jwt, user }
 */

const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data


  
}
const registerApi = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/local/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message[0].messages[0].message);
  }
};
const updateUserApi = async (userData) => {
  try {
    console.log(userData);
    const response = await axiosInstance.put(`/users/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Erreur lors de la mise à jour de l'utilisateur");
  }
};

const createArtisanApi = async (formData, userId) => {
  try {
    const data = {
      data: {
        ...formData,
        user: userId
      }
    };
    const response = await axiosInstance.post('/artisans', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la création de l\'artisan');
  }
};


export {
  loginApi,
  registerApi,
  updateUserApi,
  createArtisanApi
}
