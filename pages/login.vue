<template>
  <div>
    <section class="relative block" style="height: 500px;">

      <div
        class="absolute top-0 w-full h-full bg-purple-900"
        style="background-image: linear-gradient(90deg, rgba(81,60,127,1) 0%, rgba(201,67,126,1) 100%);"
      ></div>
      <div
        class="absolute top-0 w-full h-full"
        style="background-size: 100%; background-repeat: no-repeat;"
        :style="{'background-image': 'url(' + require('~/assets/img/register_bg_2.png') + ')'}"
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-25 bg-black"
        ></span>

        <div class="container relative mx-auto mt-32 md:mt-40">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
              <h1>
                Sign In / Register
              </h1>
              <p class="mt-4 text-lg text-gray-300">
                Sign into your existing account or register for a new profile
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
        style="height: 70px; transform: translateZ(0px);"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-gray-800 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>

    <section class="relative py-16 bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-xl rounded-lg -mt-64">

          <div class="px-6">
            <div class="flex flex-wrap justify-center">

              <div class="w-full lg:w-12/12 px-10 text-center">
                <p v-if="hasError" class="text-red-500 font-semibold text-s pt-8 login-error">
                  {{ errorMessage }}
                </p>
              </div>
                
              <div class="w-full lg:w-5/12 lg:px-10 mt-6 mb-6">
                <div class="relative flex flex-col min-w-0 break-words w-full">
                  <div v-if="login_step === login_steps.login" class="relative flex flex-col min-w-0 break-words w-full border-0">
                    <div v-if="!$auth.isAuthenticated">
                      <form @submit.prevent="login">
                        <div class="text-gray-700 mb-3 font-bold">
                          <h2 class="text-2xl">Sign In</h2>
                        </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password"
                              >Email</label
                            >
                            <input 
                              v-model="loginForm.email" 
                              type="email" 
                              placeholder="Email" 
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                              style="transition: all 0.15s ease 0s;" />
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password">
                              Password
                            </label>
                            <input
                              v-model="loginForm.password"
                              type="password"
                              placeholder="Password"
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              style="transition: all 0.15s ease 0s;"
                            />
                          </div>
                          <div class="flex flex-wrap justify-center">
                            <div class="relative w-full mb-3 lg:w-6/12">
                              <label class="inline-flex items-center cursor-pointer"
                                ><input
                                  id="customCheckLogin"
                                  type="checkbox"
                                  class="form-checkbox text-gray-800 ml-1 w-5 h-5"
                                  style="transition: all 0.15s ease 0s;"
                                /><span class="ml-2 text-sm font-semibold text-gray-700"
                                  >Remember me</span
                                ></label
                              >
                            </div>
                            <div class="relative w-full mb-3 lg:w-6/12 text-right">
                              <div class="inline-flex items-center cursor-pointer mr-3">
                                <span class="form-checkbox text-gray-800 ml-1 w-5 h-5"></span>
                                <a
                                  class="ml-2 text-sm font-semibold text-gray-700"
                                  type="cancel"
                                  @click="forgotPassword()"
                                  style="transition: all 0.15s ease 0s;"
                                >
                                  Forgotten Password?
                                </a>
                              </div>
                            </div>
                          </div>
                          <div class="text-center mt-6">
                            <button
                              class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Sign In
                            </button>
                          </div>
                      </form>
                    </div>
                    <div v-if="$auth.forcePasswordChange">
                      <form @submit.prevent="completeNewPassword">
                        <div class="text-gray-700 mb-3 font-bold">
                          <h2 class="text-2xl">Password Change</h2>
                        </div>
                        <div class="text-purple-800 text-center mb-3 text-s font-bold">
                          <p>Before you can log in, you must first change your password.</p>
                        </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password">
                              New Password
                            </label>
                            <input
                              v-model="loginForm.newPassword"
                              type="password"
                              placeholder="Password"
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              style="transition: all 0.15s ease 0s;"
                            />
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password">
                              Confirm Password
                            </label>
                            <input
                              v-model="loginForm.newPasswordConfirm"
                              type="password"
                              placeholder="Confirm Password"
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              style="transition: all 0.15s ease 0s;"
                            />
                          </div>
                          <div class="text-center mt-6">
                            <button
                              class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Change Password
                            </button>
                            <button
                              class="bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="button"
                              @click="$store.dispatch('auth/logout')"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Cancel
                            </button>
                          </div>
                      </form>
                    </div>
                  </div>

                  <div v-if="login_step === login_steps.confirm">
                    <form @submit.prevent="passwordReset">
                      <div class="text-gray-700 mb-3 font-bold">
                        <h2 class="text-2xl">Password Reset</h2>
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-email"
                          >Email</label
                        >
                        <input 
                          v-model="passwordResetForm.email" 
                          id="grid-email"
                          type="email" 
                          placeholder="Email" 
                          required
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                          style="transition: all 0.15s ease 0s;" />
                      </div>

                      <div class="text-center mt-6">
                        <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Reset Password
                        </button>
                        <button
                          class="bg-red-700 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="cancel"
                          @click="cancelConfirm('login')"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    <!-- Authenticated -->
                  </div>

                  <div v-if="login_step === login_steps.reset">
                    <form @submit.prevent="passwordResetConfirm">
                      <div class="text-gray-700 mb-3 font-bold">
                        <h2 class="text-2xl">New Password</h2>
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-code"
                          >Code</label
                        >
                        <input 
                          v-model="passwordResetConfirmForm.code" 
                          id="grid-code"
                          type="text" 
                          placeholder="Code" 
                          required
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                          style="transition: all 0.15s ease 0s;" />
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password">
                          New Password
                        </label>
                        <input
                          v-model="passwordResetConfirmForm.newPassword"
                          type="password"
                          placeholder="Password"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          style="transition: all 0.15s ease 0s;"
                        />
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password">
                          Confirm Password
                        </label>
                        <input
                          v-model="passwordResetConfirmForm.newPasswordConfirm"
                          type="password"
                          placeholder="Confirm Password"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          style="transition: all 0.15s ease 0s;"
                        />
                      </div>
                      <div class="text-center mt-6">
                        <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Change Password
                        </button>
                        <button
                          class="bg-red-700 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="cancel"
                          @click="cancelConfirm('login')"
                          style="transition: all 0.15s ease 0s;"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    <!-- Authenticated -->
                  </div>
                </div>
              </div>

              <div class="w-full lg:w-7/12 lg:px-10 border-l lg:border-gray-900 mt-6 mb-6">
                <div class="relative flex flex-col min-w-0 break-words w-full">
                  <div class="relative flex flex-col min-w-0 break-words w-full">
                    <div class="relative flex flex-col min-w-0 break-words w-full border-0">
                      <div v-if="!$auth.isAuthenticated">              
                        <form v-if="register_step === register_steps.register" @submit.prevent="register">
                          <div class="text-gray-700 mb-3 font-bold">
                            <h2 class="text-2xl">Register</h2>
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password"
                              >Email</label
                            >
                            <input 
                              v-model="registerForm.email" 
                              type="email" 
                              placeholder="Email" 
                              required
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                              style="transition: all 0.15s ease 0s;" />
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password"
                              >First Name</label
                            >
                            <input 
                              v-model="registerForm.firstName" 
                              type="text" 
                              placeholder="First Name" 
                              required
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                              style="transition: all 0.15s ease 0s;" />
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password"
                              >Last Name</label
                            >
                            <input 
                              v-model="registerForm.lastName" 
                              type="text" 
                              placeholder="Last Name" 
                              required
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                              style="transition: all 0.15s ease 0s;" />
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password">
                              Password
                            </label>
                            <input
                              v-model="registerForm.password"
                              type="password"
                              placeholder="Password"
                              required
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              style="transition: all 0.15s ease 0s;"
                            />
                          </div>
                          <div class="text-center mt-6">
                            <button
                              class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Register
                            </button>
                          </div>
                        </form>

                        <form v-else @submit.prevent="registerConfirm">
                          <div class="text-gray-700 mb-3 font-bold">
                            <h2 class="text-2xl">Registration Confirmation</h2>
                          </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-email"
                              >Email</label
                            >
                            <input 
                              v-model="registerConfirmForm.email" 
                              id="grid-email"
                              type="email" 
                              placeholder="Email" 
                              required
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                              style="transition: all 0.15s ease 0s;" />
                          </div>


                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-code"
                              >Code</label
                            >
                            <input 
                              v-model="registerConfirmForm.code" 
                              id="grid-code"
                              type="text" 
                              placeholder="Code" 
                              required
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
                              style="transition: all 0.15s ease 0s;" />
                          </div>

                          <div class="text-center mt-6">
                            <button
                              class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Confirm
                            </button>
                            <button
                              class="bg-red-700 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="cancel"
                              @click="cancelConfirm('register')"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <!-- Authenticated -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const login_steps = {
  login: 'LOGIN',
  confirm: 'CONFIRM',
  reset: 'RESET'
}
const register_steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
}

export default Vue.extend({
  name: "talent-login",
  components: {
  },
  data: () => ({
    hasError: false,
    authUser: null,
    errorMessage: 'Incorrect username or password.',
    loginForm: {
      email: '',
      password: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    passwordResetForm: {
      email: ''
    },
    passwordResetConfirmForm: {
      code: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    login_steps: { ...login_steps },
    login_step: login_steps.login,
    register_steps: { ...register_steps },
    register_step: register_steps.register,
    registerForm: {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    },
    registerConfirmForm: {
      email: '',
      code: ''
    }
  }),
  mounted() {
    if (this.$auth.user) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      try {
        this.authUser = await this.$store.dispatch('auth/login', this.loginForm)
        if (this.authUser.challengeName != 'NEW_PASSWORD_REQUIRED') {
          this.$router.push('/')
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      } catch (error) {
        console.log(error);
        this.hasError = true;
      }
    },
    async completeNewPassword() {
      try {    
        if (this.loginForm.newPassword == this.loginForm.newPasswordConfirm) {
          this.authUser = await this.$store.dispatch(
            {
                type: 'auth/completeNewPassword',
                user: this.authUser,
                newPassword: this.loginForm.newPassword
            }
          )

          if (!this.authUser.challengeName) {
            this.$router.push('/')
          }
        } else {
          this.errorMessage = 'Passwords do not match';
          this.hasError = true;
        }  

      } catch (error) {
        this.hasError = true;
      }
    },
    async cancelConfirm(type) {
      try {
        if (type == 'login') {
          this.loginForm.email = this.passwordResetForm.email;
          this.loginForm.password = '';
          this.loginForm.newPassword = '';
          this.loginForm.newPasswordConfirm = '';

          this.login_step = login_steps.login;
        } else if (type == 'register') {
          this.registerForm.email = '';
          this.registerForm.firstName = '';
          this.registerForm.lastName = '';
          this.registerForm.password = '';

          this.register_step = register_steps.register;
        }
      } catch (error) {
        this.hasError = true;
      }
    },
    async register() {
      try {
        await this.$store.dispatch('auth/register', this.registerForm)
        this.registerConfirmForm.email = this.registerForm.email
        this.register_step = this.register_steps.confirm
      } catch (error) {
        this.hasError = true;
        this.errorMessage = error.message
        console.log({ error })
      }
    },
    async registerConfirm() {
      try {
        await this.$store.dispatch('auth/confirmRegistration', this.registerConfirmForm)

        let authUser = await this.$store.dispatch('auth/login', this.registerForm)

        await this.$store.dispatch('profile/create', {email: this.registerConfirmForm.email, fullName: this.registerForm.firstName+' '+this.registerForm.lastName})

        this.$router.push('/manage')
      } catch (error) {
        console.log({ error })
      }
    },
    async forgotPassword() {
        this.passwordResetForm.email = this.loginForm.email
        this.login_step = this.login_steps.confirm
    },
    async passwordReset() {
      try {
        await this.$store.dispatch('auth/forgotPassword', this.passwordResetForm)

        this.passwordResetConfirmForm.email = this.passwordResetForm.email
        this.login_step = this.login_steps.reset
      } catch (error) {
        console.log({ error })
      }
    },
    async passwordResetConfirm() {
      try {
        if (this.passwordResetConfirmForm.newPassword == this.passwordResetConfirmForm.newPasswordConfirm) {
          await this.$store.dispatch('auth/forgotPasswordConfirm', this.passwordResetConfirmForm)

          let authUser = await this.$store.dispatch('auth/login', {email: this.passwordResetConfirmForm.email, password: this.passwordResetConfirmForm.newPassword})

          this.$router.push('/')
        } else {
          this.errorMessage = 'Passwords do not match';
          this.hasError = true;
        }  
      } catch (error) {
        console.log({ error })
      }
    }
  }
})
</script>