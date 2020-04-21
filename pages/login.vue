<template>
  <div>
    <navbar-component></navbar-component>
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
                  <div v-if="!signedIn">
                    <amplify-authenticator v-bind:authConfig="authConfig" class="sign-in-box"></amplify-authenticator>
                  </div>
                  <div v-else>
                    <amplify-sign-out/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <footer-component></footer-component>
      </section>
    </main>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
export default {
  data() {
    return {
      signedIn: false,
      authConfig: {
        signInConfig: {
          header: 'Sign In',
          isSignUpDisplayed: false
        }
      }
    }
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        this.signedIn = true
        console.log(user)
      } catch(err) {
        this.signedIn = false
      }
    }
  },
  created() {
    this.findUser()
    AmplifyEventBus.$on('authState', info => {
      if(info === "signedIn") {
        this.findUser()
      } else {
        this.signedIn = false
      }
    })
  }
}
</script>
<!-- px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full -->

<style>
.sign-in-box > div { 
  background-color:#e2e8f0;
}

.sign-in-box, 
.sign-in-box a, 
.sign-in-box button {
  font-family: "Amazon Ember","Helvetica Neue Light","Helvetica Neue","Helvetica","Arial","sans-serif"; 
}

.sign-in-box input {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  color: #4a5568;
  font-size: 0.875rem;
  line-height:1.5;
  border-radius: 0.25rem;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
  font-family:"Amazon Ember","Helvetica Neue Light","Helvetica Neue","Helvetica","Arial","sans-serif";
}

.sign-in-box input::placeholder	{
  color: #cbd5e0;
}

.sign-in-box a {
  color:#4a5568;
  font-weight:600;
}

.sign-in-box button {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
  text-transform: uppercase;
  width: 100%;
  color: #fff;
  outline: 0;
  font-weight: 700;
  border-radius: 0.25rem;
  background-color: #1a202c;
}
</style>