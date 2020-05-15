
<template>
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold">Popular Profiles</h2>
              <p class="text-lg leading-relaxed m-4 text-gray-600">
                Below are our most searched for and viewed profiles.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div v-for="profile in profiles" :key="profile.id" class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  src="../assets/img/Silhouette.png"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                  style="max-width: 120px;"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">{{ profile.job_title }}</h5>
                  <div class="mt-6">
                    <button
                      class="bg-purple-800 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      href="/profile"
                      style="transition: all 0.15s ease 0s;"
                      @click="onActionClicked('view-item', profile)"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      profiles: []
    }
  },
  mounted() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': (this.$auth.user && this.$auth.user.signInUserSession.idToken.jwtToken) ? this.$auth.user.signInUserSession.idToken.jwtToken : []
    }
    axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/popular", 
      { },
      { headers: headers }
    )
    .then(response => {
      this.profiles = response.data.result;
    })
    .catch(error => {
      console.log(error)
    });
  },
  methods: {
    onActionClicked(action, data) {
      switch (action) {
        case 'view-item':
          this.$router.push('/profile/'+data.id+'/')
          break;
      }
    }
  }
}
</script>