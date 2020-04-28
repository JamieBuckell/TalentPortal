
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
                    <div>
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

<script>
export default {
  data: () => ({
    hasError: false,
    errorMessage: 'Incorrect username or password.',
    form: {
      email: '',
      password: ''
    }
  }),

  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push('/')
      } catch (error) {
        this.hasError = true;
        //this.errorMessage = error.message;
      }
    }
  }
}
</script>