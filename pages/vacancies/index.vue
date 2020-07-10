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
              Job Vacanies
            </h1>
            <p class="text-white text-lg font-semibold">
              Below you will find a list of job vacancies available within the Leighton Group or as part of our wider network. 
              This list is external to the Team Augmentation opportunities we may have available.
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

    <section class="relative py-20 pt-10 pb-24 bg-gray-300">
      <div class="container mx-auto px-4 sm:px-8">

        <div v-if="$auth.isVacanciesAdmin" class="flex flex-wrap">
          <div class="relative w-full pr-6 text-right">
            <a href="/vacancies/manage" class="btn btn-positive inline-block">
              <i class="fa fa-plus text-lg"></i>
              Add New
            </a>
          </div>
        </div>
        <div class="py-8 flex flex-wrap">
          <div class="relative w-full pr-6">
            <div v-show="!data.length" class="job-listing flex items-center">
              <div class="w-24">
                <img src="https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png" 
                     alt="No Vacancies"
                     class="rounded-md" />                     
              </div>
              <div class="relative w-full flex flex-wrap ml-6">
                <h4 class="relative w-full flex flex-wrap text-xl text-gray-700">
                  No Currently Known Vacancies
                </h4>
              </div>
            </div>
            
            <a v-show="data.length" v-for="(vacancy, i) in data" :key="i" :href="'/vacancies/' + vacancy.id" class="job-listing flex items-center" ref="vacancies" :data-vacancy-id="vacancy.id">
              <div class="w-24">
                <img v-if="vacancy.logo" :src="vacancy.logo" 
                     :alt="vacancy.organisation + ': ' + vacancy.job_title"
                     class="rounded-md" />
                <img v-else src="https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png" 
                     :alt="vacancy.organisation + ': ' + vacancy.job_title"
                     class="rounded-md" />                     
              </div>
              <div class="relative w-full flex flex-wrap ml-6">
                <h4 class="relative w-full flex flex-wrap text-xl text-gray-700">
                  {{ vacancy.job_title }}
                </h4>
                <ul class="relative w-full flex flex-wrap text-gray-500 text-sm">
                  <li class="pr-4 whitespace-no-wrap w-auto"><i class="fa fa-briefcase"></i> {{ vacancy.organisation }}</li>
                  <li class="pr-4 whitespace-no-wrap w-auto"><i class="fa fa-map-marked-alt"></i> {{ vacancy.location_basic }}</li>
                  <li v-if="vacancy.rate" class="pr-4 whitespace-no-wrap w-auto"><i class="fa fa-money-bill"></i> {{ vacancy.rate }}</li>
                  <!-- <li class="pr-4 whitespace-no-wrap w-auto">
                    <div class="border rounded-sm px-1 text-xs border-green-500 text-green-500 bg-green-100">new</div>
                  </li> -->
                </ul>
              </div>

              <div v-if="$auth.isVacanciesAdmin" 
                   class="relative w-48 flex-wrap">
                <button v-on:click.prevent 
                        v-on:click="editVacancy(vacancy)" 
                        class="btn btn-positive inline-block w-full text-center z-50">
                  <i class="fa fa-pencil-alt text-lg"></i>
                  Edit
                </button>

                <button v-on:click.prevent 
                        v-on:click="deleteVacancy(vacancy)"
                        class="btn btn-danger inline-block w-full text-center">
                  <i class="fa fa-trash text-lg"></i>
                  Delete
                </button>
              </div>
            </a>
          </div>
          <div class="relative w-full md:w-3/12">
            <!-- --
            <h4 class="relative w-full flex flex-wrap text-xl text-gray-700">
              Sort By
            </h4>
            <select
              class="input-style w-full mb-6"
            >
              <option>Popular</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <h4 class="relative w-full flex flex-wrap text-xl text-gray-700">
              Location
            </h4>
            <select
              class="input-style w-full mb-6"
            >
              <option>Here</option>
              <option>There</option>
              <option>Everywhere</option>
            </select>

            <h4 class="relative w-full flex flex-wrap text-xl text-gray-700">
              Organisation
            </h4>
            <select
              class="input-style w-full mb-6"
            >
              <option>Visualsoft</option>
            </select>

            <button class="btn bg-purple-700">Filter</button>
            <!-- -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "vacancies-list",
  middleware: "auth",
  components: {
  },
  
  data() {
    return {
      perPage: 10,
      data: []
    };
  },

  mounted() {
    this.getVacancies();
  },

  methods: {
    async getVacancies() {
      var data = { "viewType" : 'basic' };
      var vacancyData = await this.$parent.$parent.apiCall('vacancies', data)
      this.data = vacancyData;
    },
    editVacancy(vacancy) {
      this.$router.push('/vacancies/manage/'+vacancy.id+'/');
    },
    deleteVacancy(vacancy) {
      this.$parent.$parent.modal.title = 'Remove Vacancy';
      this.$parent.$parent.modal.content = "Are you sure you want to remove the Vacancy:<br /><strong>" + vacancy.organisation + '</strong> - <strong>' + vacancy.job_title + '</strong>?';
      this.$parent.$parent.modal.action_text = "Yes, i'm sure";
      this.$parent.$parent.modal.action_data = vacancy;
      this.$parent.$parent.modal.action_method = this.doVacancyDelete;
      this.$parent.$parent.modal.secondary_action_text = "";
      this.$parent.$parent.modal.close_text = 'Cancel';
      this.$parent.$parent.modal.detail = "";
      this.$parent.$parent.modal.type = 'delete';

      this.$parent.$parent.isModalVisible = true;
    },
    async doVacancyDelete(e, vacancy) {
      this.$parent.$parent.closeModal();
      
      var data = {vacancy_id: vacancy.id, status: 0};
      var updateSuccess = await this.$parent.$parent.apiCall('vacancies/update', data)

      if (updateSuccess == true) {
        var updatedData = {}
        for (var key in this.data) {
          if (this.data[key].id == vacancy.id) {
            this.data.splice(key,1);
          }
        }
      }
    }
  }
});

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>