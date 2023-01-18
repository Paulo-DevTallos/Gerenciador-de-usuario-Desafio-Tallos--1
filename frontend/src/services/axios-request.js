import { http } from "./axios-config"

export default {
  listar: () => {
    return http.get('/api/listusers') 
  },
  createUser: (data) => {
    return http.post('/api/register', data)
  },
  loginUser: (data) => {
    return http.post('/api/login', data)
  },
  findOne: (email) => {
    return http.get(`/api/search/${email}`)
  },
  update: (data, id) => {
    return http.patch(`/api/update/${id}`, data)
  },
  removeUser: (id) => {
    return http.delete(`/api/remove/${id}`)
  }
}