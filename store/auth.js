import { Auth } from 'aws-amplify'

export const state = () => ({
  isAuthenticated: false,
  emailVerified: true,
  forcePasswordChange: false,
  user: null
})

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user
    state.forcePasswordChange = user && user.challengeName == 'NEW_PASSWORD_REQUIRED'
    state.emailVerified = user && user.attributes.email_verified == "true"
    state.user = user
  },
  setEmailVerification(state, verified) {
    state.emailVerified = verified
    console.log(state)
  }

}

export const actions = {
  async load({ commit, dispatch }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      user.attributes.email_verified = await dispatch('updateAttributes', { user });
      commit('set', user)

      return user
    } catch (error) {
      commit('set', null)
    }
  },

  async updateAttributes({ commit }, { user }) {
    const userAttributes = await Auth.userAttributes(user)
    let verified = this.state.auth.emailVerified
    for (let attribute in userAttributes) {
      if (userAttributes[attribute]['Name'] == 'email_verified') {
        verified = userAttributes[attribute]['Value']
      }
    }
    
    return verified;
  },

  async register(_, { email, password, firstName, lastName }) {
    const user = await Auth.signUp({
      username: email,
      password,
      attributes: { "given_name": firstName, "family_name": lastName }
    })
    return user
  },

  async confirmRegistration(_, { email, code }) {
    return await Auth.confirmSignUp(email, code)
  },
  
  async completeNewPassword(_, {user, newPassword }) {
    return await Auth.completeNewPassword(user, newPassword)
  },

  async forgotPassword(_, { email }) {
    return await Auth.forgotPassword(email);
  },

  async changeEmail({ commit, dispatch }, { email }) {
    try {
      let updateEmail = await Auth.updateUserAttributes(Auth.user, { email: email });

      commit('setEmailVerification', false);

      return updateEmail
    } catch (error) {
      return error
    }
  },

  async verifyEmail({ commit }, { code }) {
    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", code);

      commit('setEmailVerification', true);

      return true
    } catch (error) {
      return error
    } 
  },

  async resendEmailVerify(_, {}) {
    try {
      return await Auth.verifyCurrentUserAttribute("email");
    } catch (error) {
      return error
    } 
  },

  async forgotPasswordConfirm(_, { email, code, newPassword }) {
    return await Auth.forgotPasswordSubmit(email, code, newPassword);
  },

  async login({ commit, dispatch }, { email, password }) {
    const user = await Auth.signIn(email, password)

    commit('set', user)
    user.attributes.email_verified = await dispatch('updateAttributes', { user });

    return user
  },

  async logout({ commit }) {
    await Auth.signOut()
    commit('set', null)
    this.$router.push('/login')
  }
}