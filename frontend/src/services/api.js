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



export {
  loginApi,
  registerApi,
}
