<template>
  <div>
    <div
      class="relative pt-16 pb-16 flex content-center items-center justify-center"
    >
      <div
        class="absolute top-0 w-full h-full bg-purple-900"
        style="background-image: linear-gradient(90deg, rgba(81,60,127,1) 0%, rgba(201,67,126,1) 100%);"
      ></div>
      <div
        class="absolute top-0 w-full h-full"
        style="background-size: 100%; background-repeat: no-repeat;"
        :style="{
          'background-image':
            'url(' + require('~/assets/img/register_bg_2.png') + ')'
        }"
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-25 bg-black"
        ></span>
      </div>
      <div class="container relative mx-auto">
        <div class="items-center flex flex-wrap">
          <div class="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
            <h1>
              {{ vacancy_data.job_title }}
            </h1>
            <p class="text-sm text-white font-semibold opacity-75">
              {{ vacancy_data.industry }}
            </p>
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
            class="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>

    <section class="bg-gray-300 text-xs">
      <div class="container mx-auto px-4 flex flex-wrap items-center">
        <div class="w-8/12 pt-2 px-4">
          <a href="/vacancies" class="font-semibold">Vacancies</a> &gt;
          <a :href="'/vacancies/' + vacancy_data.vacancy_id" class="">{{ vacancy_data.organisation }} - {{ vacancy_data.job_title }}</a>
        </div>

        <div class="w-4/12 pt-2 px-4">
          <a
            class="btn btn-tertiary inline-block float-right"
            href="/vacancies"
            style="transition: all 0.15s ease 0s;"
          >
            <i class="fas fa-arrow-left mr-2 text-lg"></i>
            Back
          </a>

          <a v-if="$auth.isVacanciesAdmin" :href="'/vacancies/manage/' + vacancy_data.vacancy_id" class="btn bg-green-500 inline-block float-right">
            <i class="fa fa-edit text-lg"></i>
            Edit
          </a>
        </div>
      </div>
    </section>

    <section class="relative pb-24 bg-gray-300">
      <div class="container mx-auto px-4">
        <div class="py-8 px-4 flex flex-wrap text-gray-800">
          <div class="flex flex-wrap w-full sm:w-8/12 items-center pr-6 order-2 sm:order-1">
            <img :src="vacancy_data.logo" 
                  :alt="vacancy_data.organisation + ': ' + vacancy_data.job_title"
                  class="rounded-md w-24 mr-6" />
            <h3 class="text-md">{{ vacancy_data.organisation }}</h3>

            <hr class="border-t-1 border-gray-400 w-full my-6" />

            <div v-if="vacancy_data.summary" v-html="vacancy_data.summary" class="vacancy-detail"></div>

            <h4 v-if="vacancy_data.requirements" class="vacancy-detail-heading">Job Requirements</h4>
            <div v-if="vacancy_data.requirements" v-html="vacancy_data.requirements" class="vacancy-detail"></div>
          </div>

          <div class="flex flex-wrap w-full sm:w-4/12 content-start order-1 mb-6 sm:mb-0 sm:order-2">
            <overview-component :vacancy="vacancy_data"></overview-component>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OverviewComponent from "~/components/Vacancies/Overview.vue";

export default Vue.extend({
  name: "vacancies-view",
  middleware: 'auth',
  components: {
    OverviewComponent
  },

  data() {
      return {
        isAdmin: false,
        vacancy_data: {
          vacancy_id: '0',
          job_title: '',
          logo: 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png',//require('~/assets/img/Silhouette.png'),
          internal_contact: { name: '' },
          organisation: '',
          industry: '',
          location: '',
          hours: '',
          rate: '',
          summary: '',
          requirements: '',
          application_link: '',
        },
      }
  },
  methods: {
    async getVacancyData(vacancy_id) {
      var data = { "viewType" : 'individual', "id":  vacancy_id};
      var vacancyData = await this.$parent.$parent.apiCall('vacancies', data)
      
      console.log(vacancyData.length, vacancyData);

      if (vacancyData.length == 0) {
        this.$router.push('/vacancies');
      } else {
        this.vacancy_data.vacancy_id = vacancyData.id;

        for (let dataKey in vacancyData) {
          if (typeof this.vacancy_data[dataKey] != 'undefined' && vacancyData[dataKey] != '') {
            this.vacancy_data[dataKey] = vacancyData[dataKey];
          }
        }
      }
    }
  },
  mounted() {
    if (
      !this.$auth.isVacanciesAdmin || 
      !this.$route.params.id
    ) {
      this.$router.push('/vacancies')
    } else {
      this.getVacancyData(this.$route.params.id)
    }
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>
