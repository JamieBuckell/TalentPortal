import Vue from 'vue'

class AuthService {
  constructor(store) {
    this.$store = store
  }

  get isAuthenticated() {
    return this.$store.state.auth.isAuthenticated
  }

  get emailVerified() {
    return this.$store.state.auth.emailVerified
  }

  get forcePasswordChange() {
    return this.$store.state.auth.forcePasswordChange
  }

  get user() {
    return this.$store.state.auth.user
  }

  get email() {
    if (!this.user) return
    return this.user.attributes.email
  }
}

export default async ({ store }) => {
  const authService = new AuthService(store)
  Vue.prototype.$auth = authService
  Vue.$auth = authService
  await store.dispatch('auth/load')
}
