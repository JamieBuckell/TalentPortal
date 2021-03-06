<template>
  <div>
    <navbar-component></navbar-component>
    <main>
      <nuxt />
    </main>
    <footer-component></footer-component>

    <div v-if="$auth.isAuthenticated && !$auth.emailVerified" class="transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5">
      <div class="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div class="p-2 rounded-lg bg-blue-500 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <i class="fas fa-info mr-2 text-lg text-white"></i>
              <p class="ml-3 font-medium text-white truncate">
                <span class="lg:hidden">
                  Your email address has not been verified.
                </span>
                <span class="hidden lg:inline text-gray-400">
                  <strong class="text-white font-semibold mr-1">Your email address has not been verified.</strong>
                </span>
              </p>
            </div>
            <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <div class="rounded-md shadow-sm">
                <button
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:underline"
                  @click="verifyEmailModal()"
                  style="transition: all 0.15s ease 0s;"
                >

                  <i class="fas fa-envelope mr-2 text-lg text-whites"></i>
                  Verify Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-component v-if="isModalVisible"
      :title="modal.title"
      :content="modal.content"
      :action_text="modal.action_text"
      :action_data="modal.action_data"
      :secondary_action_text="modal.secondary_action_text"
      :close_text="modal.close_text"
      :show_modal="isModalVisible"
      :modal_detail="modal.detail"
      @close="closeModal()"
      @action="modal.action_method"
      @secondary_action="secondaryActionModal"
       >
       <template v-slot:inputs>
         <div v-if="showVerificationCode">
          <label class="mt-3 pt-3 font-bold placeholder-gray-600 w-full text-sm">
            Email Verification Code
          </label>
          <p class="w-full text-sm">You have been sent a verification code via email. Provide this code in the box below.</p>
          <input 
            ref="verification_code"
            v-model="email_verification.code" 
            type="text" 
            name="verification_code" 
            placeholder="123456" 
            class="my-3 px-3 py-3 placeholder-gray-600 w-full border-2 rounded text-sm shadow focus:outline-none focus:shadow-outline" 
          />

          <p v-if="email_verification.error" class="text-red-500 font-semibold text-s px-2 pb-2">{{ email_verification.error }}</p>
         </div>
       </template>
    </modal-component>

    <div v-if="isOverlayVisible" class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
      <span class="text-purple-800 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style="
        top: 50%;
    ">
        <i class="fas fa-circle-notch fa-spin fa-5x"></i>
      </span>
    </div>
    <div v-if="hasErrors">
      <div class="transition transform fixed z-50 top-0 mt-6 inset-x-0 pb-2 sm:pb-5">
        <div v-for="error in allErrors" v-bind:key="error" class="max-w-screen-xl mx-auto pt-2 px-2 sm:px-4 block">
          <div v-if="error.show" class="p-2 rounded-lg bg-red-500 shadow-lg sm:p-3">
            <div class="flex items-center justify-between flex-wrap">
              <div class="w-0 flex-1 flex items-center">
                <i class="fas fa-info mr-2 text-lg text-white"></i>
                <p class="ml-3 font-medium text-white truncate">
                  <span class="lg:hidden">
                    {{ error.message }}
                  </span>
                  <span class="hidden lg:inline text-gray-400">
                    <strong class="text-white font-semibold mr-1">{{ error.message }}</strong>
                  </span>
                </p>
              </div>
              <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  class="flex items-center justify-center px-2 py-2 text-sm font-medium text-white cursor-pointer"
                  @click="error.show = false"
                  style="transition: all 0.15s ease 0s;"
                >
                  <i class="fas fa-times text-lg text-whites"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import axios from "axios";
import NavbarComponent from "~/components/Navbar.vue";
import FooterComponent from "~/components/Footer.vue";
import ModalComponent from "~/components/Modal.vue";

export default Vue.extend({
  name: "default-layout",
  components: {
    NavbarComponent,
    FooterComponent,
    ModalComponent
  },

  data() {
    return {
      showVerificationCode: false,
      hasErrors: false,
      allErrors: [],
      modal: {
        title: 'Email Address Verification',
        content: '',
        action_text: 'Verify',
        action_data: {},
        action_method: this.actionModal,
        secondary_action_text: 'Resend Code',
        close_text: 'Cancel',
        detail: ''
      },
      email_verification: {
        code: '',
        error: ''
      },
      isModalVisible: false,
      isOverlayVisible: false
    }
  },

  methods: {

    async apiCall(method, data) {
      this.showOverlay();

      var returnData = {}

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
      }
      
      await axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/"+method, 
        data,
        { headers: headers }
      )
      .then(response => {

        if (typeof response.data.error != 'undefined') {
          this.hasErrors = true;
          this.allErrors.push({message: response.data.error, show: true});
        }

        this.hideOverlay();

        returnData = response.data.result;
      })
      .catch(error => {
        if (typeof error.message != 'undefined') {
          this.hasErrors = true;
          this.allErrors.push({message: error.message, show: true});
        }
        console.log(error)
        this.hideOverlay();
      });

      return returnData;
    },
    verifyEmailModal() {
      this.isModalVisible = true;
      this.showVerificationCode = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async actionModal(e) {
      let verifyEmail = await this.$store.dispatch({
          type: 'auth/verifyEmail',
          code: this.email_verification.code
      })

      if (typeof verifyEmail !== 'undefined' && typeof verifyEmail.message !== 'undefined') {
        this.email_verification.error = verifyEmail.message;
      } else {
        this.isModalVisible = false;
        this.email_verification.code = '';
      } 
    },
    async secondaryActionModal(e) {
      let verifyEmail = await this.$store.dispatch({
          type: 'auth/resendEmailVerify'
      })

      if (typeof verifyEmail !== 'undefined' && verifyEmail.message !== 'undefined') {
        this.email_verification.error = verifyEmail.message;
      } else {
        this.isModalVisible = false;
      }
    },
    showOverlay() {
      this.isOverlayVisible = true;
    },
    hideOverlay() {
      this.isOverlayVisible = false;
    }
  }
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
