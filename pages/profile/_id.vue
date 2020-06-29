<template>
  <div class="profile-page">
    <section class="relative block" style="height: 300px;">

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

        <div class="content-container -mt-64">
          <div class="flex flex-wrap">
            <div class="w-full md:w-4/12 lg:w-3/12"> 
              <div class="relative">
                <div class="profile-image" :style="{ backgroundImage: `url(${profile_image})` }">
                  &nbsp;
                </div>
              </div>
            </div>

            <div class="w-full md:w-8/12 lg:w-9/12 py-6 px-6">
              <div class="flex flex-wrap text-center lg:text-left sm:mb-6">
                <div class="w-full z-40">
                  <div class="flex lg:whitespace-no-wrap lg:float-right">
                    <!--
                      <a
                        :href="download_link"
                        class="btn btn-purple flex-1 lg:flex-none"
                        type="button"
                        style="transition: all 0.15s ease 0s;"
                      >
                        Download
                      </a>
                    -->
                    <a
                      class="btn btn-gray flex-1 lg:flex-none"
                      href="/search"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <i class="fas fa-arrow-left mr-2 text-lg text-gray-500"></i>
                      Back
                    </a>
                  </div>

                </div>
                <div class="w-full">
                  <div class="flex flex-wrap lg:-mt-12 profile-headline">
                    <div class="w-full px-4" v-if="headline">
                      <div class="relative">
                        <span class="block text-4xl font-semibold leading-normal text-gray-800 edit-field">
                        <span class="field-value">
                          {{ headline }}
                        </span>
                      </span>
                      </div>
                    </div>
                    <div class="w-full px-4" v-if="sub_title">
                      <span class="block text-2xl font-semibold leading-normal text-gray-800 mb-2 edit-field">
                        <span class="field-value">
                          {{ sub_title }}
                        </span>
                      </span>
                    </div>
                    <div class="w-full px-4" v-if="location">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-800 font-bold uppercase edit-field">
                        <i class="fas fa-map-marker-alt text-lg text-gray-500"></i>
                        <span class="field-value">
                          {{ location }}
                        </span>
                      </span>
                    </div>
                    <div class="w-full px-4" v-if="contact_number">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-800 font-bold uppercase edit-field">
                        <i class="fas fa-phone-square text-lg text-gray-500"></i>
                        <span class="field-value">
                          {{ contact_number }}
                        </span>
                      </span>
                    </div>
                    <div class="w-full px-4" v-if="email_address">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-800 font-bold uppercase edit-field">
                        <i class="fas fa-envelope text-lg text-gray-500"></i>
                        <span class="field-value">
                          {{ email_address }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content-container">
          <div class="px-6">
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
                      <span v-html="experience"></span>
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
                      <span v-html="qualifications"></span>
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
                      <span v-html="attributes"></span>
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
                      <span v-html="websites"></span>
                    </p>
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

import axios from "axios";

export default Vue.extend({
  name: "profile-view",
  middleware: 'auth',
  components: {
  },

  data() {
      return {
        talent_id: '0',
        download_link: '/download/',
        profile_image: require('~/assets/img/Silhouette.png'),
        headline: '',
        sub_title: '',
        job_title: '',
        location: 'Houghton-le-Spring, Sunderland',
        contact_number: '0191 305 5140',
        email_address: 'hello@leighton.com',
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

        this.headline = typeof response.data.result.full_name != 'undefined' ? response.data.result.full_name : response.data.result.job_title;
        this.sub_title = typeof response.data.result.full_name != 'undefined' ? response.data.result.job_title : '';

        for (let dataKey in response.data.result) {
          if (typeof this[dataKey] != 'undefined' && response.data.result[dataKey] != '') {
            this[dataKey] = response.data.result[dataKey];
          }
        }
      }
    })
    .catch(error => {
      console.log(error)
    });
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>
