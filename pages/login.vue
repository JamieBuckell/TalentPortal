<template>
  <div>
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-purple-900"
          style="background-image: linear-gradient(90deg, rgba(81,60,127,1) 0%, rgba(201,67,126,1) 100%);"
        ></div>
        <div
          class="absolute top-0 w-full h-full"
          style="background-size: 100%; background-repeat: no-repeat;"
          :style="{'background-image': 'url(' + require('~/assets/img/register_bg_2.png') + ')'}"
        ></div>
          <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6">
                  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    <div v-if="!$auth.isAuthenticated">
                      <form @submit.prevent="login">
                      <div class="rounded-t mb-0 px-6 py-6 flex-auto px-4 lg:px-10 pt-6">
                        <div class="text-gray-700 text-center mb-3 font-bold">
                          <h1>Sign In</h1>
                        </div>
                          <div class="relative w-full mb-3">
                            <label
                              class="block uppercase text-gray-700 text-xs font-bold mb-2"
                              for="grid-password"
                              >Email</label
                            >
                            <input 
                              v-model="form.email" 
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
                              v-model="form.password"
                              type="password"
                              placeholder="Password"
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              style="transition: all 0.15s ease 0s;"
                            />
                          </div>
                          <div>
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
                          <p class="text-red-500 text-s pt-2 login-error" v-if="hasError">{{ errorMessage }}</p>
                          <div class="text-center mt-6">
                            <button
                              class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style="transition: all 0.15s ease 0s;"
                            >
                              Sign In
                            </button>
                          </div>
                      </div>
                      </form>
                    </div>
                    <div v-if="$auth.forcePasswordChange">
                      <form @submit.prevent="completeNewPassword">
                      <div class="rounded-t mb-0 px-6 py-6 flex-auto px-4 lg:px-10 pt-6">
                        <div class="text-gray-700 text-center mb-3 font-bold">
                          <h1>Password Change</h1>
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
                              v-model="form.newPassword"
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
                              v-model="form.newPasswordConfirm"
                              type="password"
                              placeholder="Confirm Password"
                              class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              style="transition: all 0.15s ease 0s;"
                            />
                          </div>
                          <p class="text-red-500 text-s pt-2 login-error" v-if="hasError">{{ errorMessage }}</p>
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
                      </div>
                      </form>
                    </div>
                    <!-- Authenticated -->
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "talent-login",
  components: {},
  data: () => ({
    hasError: false,
    authUser: null,
    errorMessage: 'Incorrect username or password.',
    form: {
      email: '',
      password: '',
      newPassword: '',
      newPasswordConfirm: ''
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
        this.authUser = await this.$store.dispatch('auth/login', this.form)
        if (this.authUser.challengeName != 'NEW_PASSWORD_REQUIRED') {
          this.$router.push('/')
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      } catch (error) {
        this.hasError = true;
      }
    },
    async completeNewPassword() {
      try {        
        this.authUser = await this.$store.dispatch(
          {
              type: 'auth/completeNewPassword',
              user: this.authUser,
              newPassword: this.form.newPassword
          }
        )

        if (!this.authUser.challengeName) {
          this.$router.push('/')
        }

      } catch (error) {
        this.hasError = true;
      }
    }
  }
})
</script>