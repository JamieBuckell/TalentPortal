<template>
  <div>
    <div
      class="relative pt-16 pb-32 flex content-center items-center justify-center"
      style="min-height: 25vh;"
    >
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
            class="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>

    <section class="bg-gray-300">
      <div class="container mx-auto px-4">
        <div class="w-full pt-2">
          <a href="/admin" class="font-semibold">Admin</a>
        </div>
      </div>
    </section>

    <section class="pb-20 bg-gray-300 min-h-screen">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap">


          <div class="lg:pt-6 pt-6 w-full xl:w-2/12 lg:w-3/12 md:w-4/12 px-4 text-center">
            <a href="/admin/users/" class="relative flex flex-col min-w-0 break-words bg-white md:w-full shadow-lg rounded-lg">
              <div class="px-4 py-5 flex-auto">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                  <i class="fas fa-users"></i>
                </div>
                <h6 class="text-auto font-semibold">Users</h6>
              </div>
            </a>
          </div>


          <div class="lg:pt-6 pt-6 w-full xl:w-2/12 lg:w-3/12 md:w-4/12 px-4 text-center">
            <a href="/admin/authorisations/" class="relative flex flex-col min-w-0 break-words bg-white md:w-full shadow-lg rounded-lg">
              <div class="px-4 py-5 flex-auto">
                <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-700">
                  <i class="fas fa-tasks"></i>
                </div>
                <h6 class="text-auto font-semibold">Authorisations</h6>
              </div>
            </a>
          </div>


        </div>
      </div>
    </section>

    <section class="relative block bg-gray-900">
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style="height: 80px; transform: translateZ(0px);"
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
            class="text-gray-900 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap text-center justify-center">
          <div class="w-full lg:w-6/12 px-4">
            <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
              &nbsp;
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchformComponent from "~/components/SearchForm.vue";
import PopularprofilesComponent from "~/components/PopularProfiles.vue";

import { Vuetable } from 'vuetable-2';
import FieldsDef from "~/store/searchTableFields.js";

import axios from "axios";

export default Vue.extend({
  name: "landing-page",
  middleware: 'auth',
  components: {
    SearchformComponent,
    PopularprofilesComponent,
    Vuetable
  },
  data () {
    return {
      isAdmin: false,
      fields: FieldsDef,
      css: {
        table: {
          tableWrapper: 'search-table-wrapper inline-block min-w-full shadow rounded-lg overflow-hidden',
          tableHeaderClass: 'nopeynope',
          tableClass: 'min-w-full leading-normal',
          tableBodyClass: '',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          ascendingClass: 'sorted-asc',
          descendingClass: 'sorted-desc',
          sortableIcon: 'fa fa-sort',
          detailRowClass: "px-5 py-5 border-b border-gray-200 bg-white text-sm",
          handleIcon: 'fa fa-bars text-secondary',
          renderIcon(classes, options) {
            return `<i class="${classes.join(' ')}"></span>`
          }
        },
      },
      perPage: 10,
      data: []
    }
  },
  watch: {
    data(newVal, oldVal) {
      this.$refs.vuetable.refresh();
    }
  },
  mounted() {
    const userGroups = (this.$auth.user.signInUserSession.accessToken.payload["cognito:groups"]) ? this.$auth.user.signInUserSession.accessToken.payload["cognito:groups"] : [];
    if (userGroups.indexOf("SuperAdmin") != -1) {
      this.isAdmin = true;
    } else if (userGroups.indexOf("TalentAdmin") != -1) {
      this.isAdmin = true;
    }
    if (!this.isAdmin) {
      this.$router.push('/')
    }
  },
  methods: {
    dataManager(sortOrder) {
      if (this.data.length < 1) return;

      let local = this.data;

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
      }

      return {
        data: local
      };
    },
    onActionClicked(action, data) {
      switch (action) {
        case 'view-item':
          this.$router.push('/profile/'+data.rowData.id+'/')
          break;
      }
    }
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>
