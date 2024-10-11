import axios from 'axios'
import { getUserToken, resetStorage } from './authentication'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = getUserToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

apiClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    resetStorage()
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default {
  createUser (userData) {
    return apiClient.post('/users', userData)
  },

  loginUser (credentials) {
    return apiClient.post('/login', credentials)
  },

  getCurrentUser () {
    return apiClient.get('/users/me')
  },

  getAllUsers () {
    return apiClient.get('/users')
  },

  getUserById (id) {
    return apiClient.get(`/users/${id}`)
  },

  updateUser (id, updatedData) {
    return apiClient.put(`/users/${id}`, updatedData)
  },

  deleteUser (id) {
    return apiClient.delete(`/users/${id}`)
  },

  createNote (noteData) {
    return apiClient.post('/notes', noteData)
  },

  getAllNotes () {
    return apiClient.get('/notes')
  },

  getNoteById (id) {
    return apiClient.get(`/notes/${id}`)
  },

  updateNoteById (id) {
    return apiClient.put(`/notes/${id}`)
  },

  deleteNoteById (id) {
    return apiClient.delete(`/notes/${id}`)
  }
}
