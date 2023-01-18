import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';
import Services from '../services/axios-request';

export const store = createStore({
  state: {
    user: {
      email: '',
      password: '',
    },
    token: '',
  },
  mutations: {
    authSet(state, payload) {
      state.token = payload.access_token
      state.user = payload.user
    },
  },
  actions: {
    async handleSubmitLogin(context, user) {
      await Services.loginUser({
        email: user.email,
        password: user.password
      })
      .then(res => {
        if(res.status === 200) {
          if(res.data.access_token) {
            localStorage.setItem('token', res.data.access_token)
            localStorage.setItem('session_id', res.data.user._id)
            localStorage.setItem('email', res.data.user.email)
            
            context.commit('authSet', res.data)  
          }
        }
      })
    }
  },
  plugins: [createPersistedState()], 
})