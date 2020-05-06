import axios from "axios";
import { rejects } from "assert";

export const state = () => ({
  isAuthenticated: false,
  forcePasswordChange: false,
  user: null
})

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user
    state.forcePasswordChange = user && user.challengeName == 'NEW_PASSWORD_REQUIRED'
    state.user = user
  }
}

export const actions = {
  async load({ commit }) {
    //Nothing yet
  },

  async create({ rootState }, { email, fullName }) {
    axios.post(
        "https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/create", 
        {
            "email": email,
            "full_name": fullName
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': rootState.auth.user.signInUserSession.idToken.jwtToken
            }
        }
    )
    .then(response => { 
        return true
    })
    .catch(error => {
        console.log(error)
        //mail me...
        return false;
    });
  },
}