<template>
  <div>
    <navbar-component></navbar-component>
    <main class="profile-page">
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
                <div
                  class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                >
                  <div class="relative">
                    <img
                      alt="..."
                      :src="profile_image"
                      class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                      style="max-width: 150px;"
                    />
                  </div>
                </div>
                <div
                  class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
                >
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <a
                      :href="download_link"
                      class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style="transition: all 0.15s ease 0s;"
                    >
                      Download
                    </a>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <a
                      class="bg-gray-800 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      href="/search"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <i class="fas fa-arrow-left mr-2 text-lg text-gray-500"></i>
                      Back
                    </a>
                    <!--
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-gray-700"
                        >22</span
                      ><span class="text-sm text-gray-500">Hires</span>
                    </div>
                    -->
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <span
                   v-if="job_title"
                   class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                >
                  {{ job_title }}
                </span>
                <div
                  v-if="location"
                  class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                  {{ location }}
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-gray-300 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">  
                    <div v-if="summary">
                      <a name="summary"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      >
                        Summary Profile
                      </h4>
                      <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                        <span v-html="summary"></span>
                      </p>
                    </div>
  
                    <div v-if="detail">
                      <a name="detail"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      >
                        Main Achievements and Expertise
                      </h4>
                      <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                        <span v-html="detail"></span>
                      </p>
                    </div>

                    <div v-if="experience">
                      <a name="experience"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      >
                        Commercial Experience
                      </h4>
                      <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                        {{ experience }}
                      </p>
                    </div>
  
                    <div v-if="qualifications">
                      <a name="qualifications"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      >
                        Relevant Qualifications &amp; Training
                      </h4>
                      <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                        {{ qualifications }}
                      </p>
                    </div>
  
                    <div v-if="attributes">
                      <a name="attributes"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      >
                        Personal Attributes/Competences
                      </h4>
                      <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                        {{ attributes }}
                      </p>
                    </div>
  
                    <div v-if="websites">
                      <a name="websites"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
                      >
                        Personal Websites
                      </h4>
                      <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                        {{ websites }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarComponent from "~/components/Navbar.vue";
import FooterComponent from "~/components/Footer.vue";

import axios from "axios";

export default Vue.extend({
  name: "profile-view",
  middleware: 'auth',
  components: {
    NavbarComponent,
    FooterComponent
  },

  data() {
      return {
        talent_id: '0',
        download_link: '/download/',
        profile_image: require('~/assets/img/Silhouette.png'),
        job_title: '',
        location: '',
        summary: '',
        detail: '',
        experience: '',
        qualifications: '',
        attributes: '',
        websites: ''
      }
  },
  mounted() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
    }
    var data = { "viewType" : 'profile' };
    if (typeof this.$route.params.id != 'undefined') {
      data['id'] = this.$route.params.id
    }
    axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/retrieve", 
      data,
      {
        headers: headers
      }
    )
    .then(response => { 
      if (typeof response.data.result == 'undefined' || response.data.result.length == 0) {
        this.$router.push('/search');
      } else {
        this.talent_id = response.data.result.id;
        this.download_link = '/download/'+response.data.result.id+'/';
        this.job_title = response.data.result.job_title;
        this.location = response.data.result.location;
        this.summary = response.data.result.summary;
        this.detail = response.data.result.detail;
        this.experience = response.data.result.experience;
        this.qualifications = response.data.result.qualifications;
        this.attributes = response.data.result.attributes;
        this.websites = response.data.result.websites;
      }
    })
    .catch(error => {
      console.log(error)
    });
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>
