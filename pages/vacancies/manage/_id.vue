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
              {{ page_title }}
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
          <a href="/vacancies/new">New Vacancy</a>
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
        </div>
      </div>
    </section>

    <section class="vacancy-editor relative pb-24 bg-gray-300">
      <div class="container mx-auto px-4">
        <div class="py-8 px-4 flex flex-wrap text-gray-700">
          <div class="flex flex-wrap w-full sm:w-8/12 items-center pr-6 order-2 sm:order-1">
              <div v-for="(error, i) in page_errors" 
                  :key="i" 
                  class="flex w-full mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" 
                  role="alert">
                <span class="block sm:inline">{{ error }}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>

              <label class="w-full text-xs font-bold uppercase" style="font-family: Montserrat, Arial, Helvetica, sans-serif;">
                Organisation Logo <span class="text-gray-600">(Optional)</span>
              </label>
              <div class="w-full">
                <img :src="vacancy_data.logo" 
                    :alt="vacancy_data.organisation + ': ' + vacancy_data.job_title"
                    class="rounded-md w-24" />
              </div>

            <leighton-form ref="new-vacancy" class="flex flex-wrap w-full"></leighton-form>

            <label class="w-full text-xs font-bold uppercase mt-2" style="font-family: Montserrat, Arial, Helvetica, sans-serif;">
              Job Summary <span class="text-red-600">*</span>
            </label>
            <div class="w-full">
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="vacancy_data.summary"
                  :options="editorOption"
                  class="bg-white rounded shadow my-2 text-sm"
                />                  
              </client-only>
            </div>

            <label class="w-full text-xs font-bold uppercase mt-2" style="font-family: Montserrat, Arial, Helvetica, sans-serif;">
              Requirements <span class="text-gray-600">(Optional)</span>
            </label>
            <div class="w-full">
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="vacancy_data.requirements"
                  :options="editorOption"
                  class="bg-white rounded shadow my-2 text-sm"
                />                  
              </client-only>
            </div>

            <button class="text-base py-2 btn btn-primary w-full" v-on:click="submitVacancy">Save Vacancy</button>

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
import "leighton-form";

import axios from "axios";

const vacancyData: any = {
  vacancy_id: '',
  job_title: '',
  logo: 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png',
  internal_contact: { name: '' },
  organisation: '',
  industry: '',
  location: '',
  location_basic: '',
  hours: '',
  rate: '',
  summary: '',
  requirements: '',
  application_link: '',
}

export default Vue.extend({
  name: "vacancies-view",
  middleware: 'auth',
  components: {
    OverviewComponent
  },

  data() {
      return {
        page_title: '',
        page_errors: [],
        logo_img: document.createElement('img'),
        cssUrl: '/formbuilder.css',
        vacancy_data: vacancyData,
        validity: {valid: false},
        fields: [
          {
            field: 'logo',
            fieldType: 'upload',
            label: 'Browse',
            skeleton: false,
            disabled: false,
            hidden: false,
            required: false,
            onFilesSelected: (files) => {
              const reader = new FileReader();

              reader.onload = (e: any) => {
                vacancyData.logo = e.target.result
              };

              for (var i = 0; i < files.length; i++) {
                reader.readAsDataURL(files[i]);
              }
            }
          },
          {
            field: "job_title",
            fieldType: "text",
            label: "Job Title",
            placeholder: "Head of Vacancies",
            css: "form-field",
            validation: {
              // simple internal validation
              presence: { allowEmpty: false, message: "Job Title is required" }
            },
            required: true
          },
          {
            field: "organisation",
            fieldType: "text",
            label: "Organisation",
            placeholder: "Leighton",
            css: "form-field",
            validation: {
              // simple internal validation
              presence: { allowEmpty: false, message: "Organisation is required" }
            },
            required: true
          },
          {
            field: "industry",
            fieldType: "text",
            label: "Industry",
            placeholder: "Web / Technology",
            css: "form-field",
            required: false
          },
          {
            field: "location_basic",
            fieldType: "text",
            label: "Location (Short)",
            placeholder: "Houghton-le-Spring, Durham",
            css: "form-field",
            validation: {
              // simple internal validation
              presence: { allowEmpty: false, message: "Location Short is required" }
            },
            required: true
          },
          {
            field: "location",
            fieldType: "text",
            label: "Location (Full)",
            placeholder: "Chase House (HQ), 4 Mandarin Road, Rainton Bridge, Houghton le Spring, DH4 5RA",
            css: "form-field",
            required: false
          },
          {
            field: "hours",
            fieldType: "text",
            label: "Hours",
            placeholder: "35 Hours per Week",
            css: "form-field",
            required: false
          },
          {
            field: "rate",
            fieldType: "text",
            label: "Rate",
            placeholder: "£35,000 - £45,000 per year",
            css: "form-field",
            required: false
          },
          {
            field: "application_link",
            fieldType: "text",
            label: "Application Link",
            placeholder: "https://www.leighton.com/careers",
            css: "form-field",
            required: false
          }
          /* *
          {
            fieldType: 'html',
            html: () => `<label class="label">Job Summary <span class="required">*</span></label>
                        <div style="display: table; box-sizing: border-box; border-collapse: separate; position: relative; width: 100%;">
                          <div style="display: table-cell; position: relative;">
                            <textarea ref="summary"
                                      id="vacancy_summary"
                                      class="form-control" 
                                      placeholder="Job Description Summary" 
                                      style="width: 100%; display: block;" 
                                      rows="6">${ this.vacancy_data.summary }</textarea>
                          </div>
                        </div>`,
            css: "form-field"
          },
          {
            fieldType: 'html',
            html: () => `<label class="label">Job Requirements <span class="optional">(Optional)</span></label>
                        <div style="display: table; box-sizing: border-box; border-collapse: separate; position: relative; width: 100%;">
                          <div style="display: table-cell; position: relative;">
                            <textarea ref="requirements"
                                      id="vacancy_requirements"
                                      v-model="vacancy_data.requirements"
                                      class="form-control" 
                                      placeholder="Job Requirements"
                                      style="width: 100%; display: block;"
                                      rows="6">${ this.vacancy_data.requirements }</textarea>
                          </div>
                        </div>`,
            css: "form-field",
          },
          {
            fieldType: 'buttons',
            buttons: [{
              html: 'Save Vacancy',
              css: 'btn-primary',
              onClick: () => this.submitVacancy()
            }]
          }
          /* */
        ],
        editorOption: {
          // Some Quill options...
          theme: 'snow',
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              /*[{ 'font': [] }],*/
              /*[{ 'color': [] }, { 'background': [] }],*/
              [{ 'align': [] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              /*[{ 'script': 'sub' }, { 'script': 'super' }],*/
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              /*[{ 'direction': 'rtl' }],*/
              
              ['link'/*, 'image', 'video'*/],
              ['clean']
            ]
          }
        }
      }
  },
  methods: {
    refreshForm: function(formId) {
      this.$refs[formId].cssUrl = this.cssUrl;
      this.$refs[formId].fields = this.fields;
      this.$refs[formId].data = this.vacancy_data;
    },
    getVacancyData(vacancy_id) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
      }
      var data = { 
        "viewType" : 'edit',
        "id": vacancy_id
      };
      axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/vacancies", 
        data,
        {
          headers: headers
        }
      )
      .then(response => { 
        if (typeof response.data.result == 'undefined' || response.data.result.length == 0) {
          this.$router.push('/vacancies');
        } else {
          this.vacancy_data.vacancy_id = response.data.result.id;

          for (let dataKey in response.data.result) {
            if (typeof this.vacancy_data[dataKey] != 'undefined' && response.data.result[dataKey] != '') {
              this.vacancy_data[dataKey] = response.data.result[dataKey];
            }
          }
          this.page_title = this.vacancy_data.job_title;

          this.refreshForm("new-vacancy");
        }
      })
      .catch(error => {
        console.log('error jamie', error)
      });
    },
    validateSubmission()
    {
      this.page_errors = [];
      if (
        !this.vacancy_data.job_title
      ) {
        this.page_errors.push('Job Title is Required');
      }
      if (
        !this.vacancy_data.organisation
      ) {
        this.page_errors.push('Organisation is Required');
      }
      if (
        !this.vacancy_data.location_basic
      ) {
        this.page_errors.push('Location (Short) is Required');
      }
      if (
        !this.vacancy_data.summary
      ) {
        this.page_errors.push('Job Summary is Required');
      }

      if (this.page_errors.length > 0) {
        window.scrollTo(0, 0)

        return false;
      } else {
        return true;
      }
    },
    submitVacancy()
    {
      if (this.validateSubmission()) {
        this.vacancy_data.summary = this.vacancy_data.summary.replace(/[style|role|dir]="[^"]*"/g, '');
        this.vacancy_data.requirements = this.vacancy_data.requirements.replace(/[style|role|dir]="[^"]*"/g, '');

        if (this.vacancy_data.vacancy_id) {
          this.updateVacancy()
        } else {
          this.createVacancy()
        }
      }
    },
    createVacancy()
    {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
      }
      var submit_data = this.vacancy_data;
      if (submit_data.internal_contact.id) {
        submit_data.internal_contact = submit_data.internal_contact.id
      } else {
        delete submit_data.internal_contact
      }
      this.$parent.$parent.showOverlay();
      axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/vacancies/create", 
        this.vacancy_data,
        {
          headers: headers
        }
      )
      .then(response => { 
        this.$parent.$parent.hideOverlay();
        this.$router.push('/vacancies')
      })
      .catch(error => {
        console.log('error', error)
        this.$parent.$parent.hideOverlay();
      });
    },
    updateVacancy()
    {
      /* */
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
      }
      this.$parent.$parent.showOverlay();
      axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/vacancies/update", 
        this.vacancy_data,
        {
          headers: headers
        }
      )
      .then(response => { 
        this.$parent.$parent.hideOverlay();
      })
      .catch(error => {
        console.log('jamie', error)
        this.$parent.$parent.hideOverlay();
      });
      /* */
    }
  },
  filters: {
    // a filter to show json in a useful way inside the component
    pretty: function(value) {
      return JSON.stringify(value, null, 2);
    }
  },
  mounted() {
    if (!this.$auth.isVacanciesAdmin) {
      this.$router.push('/vacancies')
    }

    this.logo_img.src = 'https://sciences.ucf.edu/psychology/wp-content/uploads/sites/63/2019/09/No-Image-Available.png';
    // this kicks off the form and shows fields
    this.refreshForm("new-vacancy");

    // this event gives us the forms validity
    this.$refs["new-vacancy"].$on("validityChanged", event => {
      this.validity = event.detail.validity; //set the validity variable for vue to use
    });

    if (typeof this.$route.params.id != 'undefined') {
      this.getVacancyData(this.$route.params.id);
    } else {
      this.page_title = 'New Vacancy';

      this.refreshForm("new-vacancy");
    }
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>