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
                  class="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-8 00 focus:outline-none focus:underline"
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
      :secondary_action_text="modal.secondary_action_text"
      :close_text="modal.close_text"
      :show_modal="isModalVisible"
      :modal_detail="modal.detail"
      @close="closeModal()"
      @action="actionModal"
      @secondary_action="secondaryActionModal"
       >
       <template v-slot:inputs>
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
         
       </template>
    </modal-component>
  </div>
</template>

<script>
import Vue from 'vue'
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
      modal: {
        title: 'Email Address Verification',
        content: '',
        action_text: 'Verify',
        secondary_action_text: 'Resend Code',
        close_text: 'Cancel',
        detail: ''
      },
      email_verification: {
        code: '',
        error: ''
      },
      isModalVisible: false
    }
  },

  methods: {
    verifyEmailModal() {
      this.isModalVisible = true;
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

.profile-image {
  background-color: #FFF;
  background-size: contain;
  height: 250px;
  width: 250px;
  margin-left: -40px;
  border-top-left-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  background-repeat: no-repeat;
  background-position: center;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
