import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  uid: '',
  loginTop: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
      state.token = token
  },
  SET_NAME: (state, name) => {
      state.name = name
  },
  SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
      state.roles = roles
  },
  SET_UID: (state, uid) => {
      state.uid = uid
  },
  SET_LOGINTOP: (state, loginTop) => {
    state.loginTop = loginTop
  }
}


export default {
  namespaced: true,
  state,
  mutations,
}