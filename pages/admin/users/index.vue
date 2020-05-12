<template>
  <div>
    <navbar-component></navbar-component>
    <main>
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
      <section class="pb-20 bg-gray-300">
        <div class="container mx-auto px-4">
          <div class="py-8">
            <div>
              <h2 class="text-2xl text-grey-700 font-semibold leading-tight">
                Roles
              </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          
              <vuetable ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :per-page="perPage"
                :data-manager="dataManager"
                :css="css.table"
              >
                <div slot="actions" slot-scope="props">
                  <button 
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" 
                    @click="onActionClicked('view-item', props)"
                  >
                    View
                  </button>
                  <!--
                  <button 
                    class="ui small button" 
                    @click="onActionClicked('edit-item', props.rowData)"
                  >
                    <i class="edit icon"></i>
                  </button>
                  <button 
                    class="ui small button" 
                    @click="onActionClicked('delete-item', props.rowData)"
                  >
                    <i class="delete icon"></i>
                  </button>
                  --> 
                </div>
              </vuetable>
              <div style="padding-top:10px">
                
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="pb-20 relative block bg-gray-900">
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
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavbarComponent from "~/components/Navbar.vue";
import FooterComponent from "~/components/Footer.vue";
import SearchformComponent from "~/components/SearchForm.vue";
import PopularprofilesComponent from "~/components/PopularProfiles.vue";

import { Vuetable } from 'vuetable-2';
import FieldsDef from "~/store/searchTableFields.js";

import axios from "axios";

export default Vue.extend({
  name: "landing-page",
  middleware: 'auth',
  components: {
    NavbarComponent,
    FooterComponent,
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

<style type="text/css">
  .search-table-wrapper {
    
  }
  .search-table-wrapper thead tr th {
    letter-spacing: .05em;
    text-transform: uppercase;
    font-size: .75rem;
    color: #718096;
    text-align: left;
    padding:.75rem 1.25rem;
    font-weight: 600;
    border-bottom-width: 2px;
    border-color: #edf2f7;
    background-color: #f7fafc;
    box-sizing: border-box;
    margin: 0;
  
  }
  .search-table-wrapper tbody tr td {
    font-size: .875rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom-width: 1px;
    border-color: #edf2f7;
    background-color: #fff;
  }
</style>