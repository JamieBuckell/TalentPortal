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
      <div class="container mx-auto px-4" @click="removeFocus()">
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
                    <button
                      class="btn btn-purple flex-1 lg:flex-none"
                      @click="showModal(email_address)"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <i class="fas fa-envelope mr-2 text-lg text-gray-500"></i>
                      Change Email
                    </button>
                    <a
                      class="btn btn-gray flex-1 lg:flex-none"
                      href="/"
                      style="transition: all 0.15s ease 0s;"
                    >
                      <i class="fas fa-arrow-left mr-2 text-lg text-gray-500"></i>
                      Back
                    </a>
                  </div>

                </div>
                <div class="w-full">
                  <div class="flex flex-wrap lg:-mt-12 profile-headline">
                    <div class="w-full px-4">
                      <div class="relative">
                        <span class="block text-4xl font-semibold leading-normal text-gray-800 edit-field">
                        <span class="field-value" v-show="!showField('full_name')" v-on:click.stop.prevent="removeFocus" @click="focusField('full_name')">
                          {{ full_name }}<span v-if="!full_name" class="text-gray-500">Full Name</span>
                        </span>
                        <input
                          ref="full_name"
                          v-model="full_name"
                          v-show="showField('full_name')"
                          type="text"
                          placeholder="Full Name"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12"
                          @focus="focusField('full_name')"
                          @blur="blurField"
                        >
                      </span>
                      <alerts-component 
                        v-if="pending_changes.full_name"
                        :alert_type='warning_alert.alert_type' 
                        :title='warning_alert.title'
                        :message='warning_alert.message'
                      />
                      <alerts-component 
                        v-if="rejected_changes.full_name"
                        :detail='rejected_changes.full_name'
                        :alert_type='error_alert.alert_type' 
                        :title='error_alert.title'
                        :message='error_alert.message'
                      />
                      </div>
                    </div>
                    <div class="w-full px-4">
                      <span class="block text-2xl font-semibold leading-normal text-gray-800 mb-2 edit-field">
                        <span class="field-value" v-show="!showField('job_title')" v-on:click.stop.prevent="removeFocus" @click="focusField('job_title')">
                          {{ job_title }}<span v-if="!job_title" class="text-gray-500">Job Title</span>
                        </span>
                        <input
                        ref="job_title"
                        v-model="job_title" 
                        v-show="showField('job_title')" 
                        type="text" 
                        placeholder="Job Title"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12" 
                        @focus="focusField('job_title')" 
                        @blur="blurField"
                        >
                      </span>
                      <alerts-component 
                      v-if="pending_changes.job_title"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                      />
                      <alerts-component 
                      v-if="rejected_changes.job_title"
                      :detail='rejected_changes.job_title'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                      />
                    </div>
                    <div class="w-full px-4">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-800 font-bold uppercase edit-field">
                        <i class="fas fa-map-marker-alt text-lg text-gray-500"></i>
                        <span class="field-value" v-show="!showField('location')" v-on:click.stop.prevent="removeFocus" @click="focusField('location')">
                          {{ location }}<span v-if="!location" class="text-gray-500">Houghton-le-Spring, Sunderland</span>
                        </span>
                        <input
                        ref="location"
                        v-model="location" 
                        v-show="showField('location')"
                        type="text" 
                        placeholder="Houghton-le-Spring, Sunderland"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12" 
                        @focus="focusField('location')" 
                        @blur="blurField"
                        >
                      </span>
                      <alerts-component 
                      v-if="pending_changes.location"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                      />
                      <alerts-component 
                      v-if="rejected_changes.location"
                      :detail='rejected_changes.location'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                      />
                    </div>
                    <div class="w-full px-4">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-800 font-bold uppercase edit-field">
                        <i class="fas fa-phone-square text-lg text-gray-500"></i>
                        <span class="field-value" v-show="!showField('contact_number')" v-on:click.stop.prevent="removeFocus" @click="focusField('contact_number')">
                          {{ contact_number }}<span v-if="!contact_number" class="text-gray-500">0191 305 5140</span>
                        </span>
                        <input
                        ref="contact_number"
                        v-model="contact_number" 
                        v-show="showField('contact_number')"
                        type="text" 
                        placeholder="0191 305 5140"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12" 
                        @focus="focusField('contact_number')" 
                        @blur="blurField"
                        >
                      </span>
                      <alerts-component 
                      v-if="pending_changes.contact_number"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                      />
                      <alerts-component 
                      v-if="rejected_changes.contact_number"
                      :detail='rejected_changes.contact_number'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                      />
                    </div>
                    <div class="w-full px-4">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-800 font-bold uppercase edit-field">
                        <i class="fas fa-envelope text-lg text-gray-500"></i>
                        <span class="field-value">
                          {{ email_address }}<span v-if="!email_address" class="text-gray-500">hello@leighton.com</span>
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
            <div class="py-10 text-center">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-9/12 px-4">  
                  <div class="relative edit-field">
                    <a name="summary"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal text-gray-800 mb-2"
                    >
                      Summary Profile
                    </h4>

                    <alerts-component 
                      v-if="pending_changes.summary"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                    />

                    <alerts-component 
                      v-if="rejected_changes.summary"
                      :detail='rejected_changes.summary'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                    />

                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <span class="field-value" v-show="!showField('summary')" v-on:click.stop.prevent="removeFocus" @click="focusField('summary')">
                        <span v-html="summary"></span>
                        <span v-if="!summary" class="text-gray-500">A breif summary of your main skills and expertise</span>
                      </span>
                      <textarea
                        ref="summary"
                        v-model="summary" 
                        v-show="showField('summary')"
                        type="text" 
                        rows="5"
                        placeholder="A breif summary of your main skills and expertise"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
                        @focus="focusField('summary')" 
                        @blur="blurField"
                      ></textarea>
                    </p>
                  </div>

                  <div class="relative">
                    <a name="detail"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal text-gray-800 mb-2"
                    >
                      Main Achievements and Expertise
                    </h4>

                    <alerts-component 
                      v-if="pending_changes.detail"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                    />
                    <alerts-component 
                      v-if="rejected_changes.detail"
                      :detail='rejected_changes.detail'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                    />
                    
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <span class="field-value" v-show="!showField('detail')" v-on:click.stop.prevent="removeFocus" @click="focusField('detail')">
                        <span v-html="detail"></span>
                        <span v-if="!detail" class="text-gray-500">The full details of your achievements, skills and expertise</span>
                      </span>
                      <textarea
                        ref="detail"
                        v-model="detail" 
                        v-show="showField('detail')"
                        type="text" 
                        rows="5"
                        placeholder="The full details of your skills and expertise"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
                        @focus="focusField('detail')" 
                        @blur="blurField"
                      ></textarea>
                    </p>
                  </div>

                  <div class="relative">
                    <a name="experience"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal text-gray-800 mb-2"
                    >
                      Commercial Experience
                    </h4>

                    <alerts-component 
                      v-if="pending_changes.experience"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                    />
                    <alerts-component 
                      v-if="rejected_changes.experience"
                      :detail='rejected_changes.experience'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                    />
                    
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <span class="field-value" v-show="!showField('experience')" v-on:click.stop.prevent="removeFocus" @click="focusField('experience')">
                        <span v-html="experience"></span>
                        <span v-if="!experience" class="text-gray-500">All your relevant previous jobs and roles</span>
                      </span>
                      <textarea
                        ref="experience"
                        v-model="experience" 
                        v-show="showField('experience')"
                        type="text" 
                        rows="5"
                        placeholder="All your relevant previous jobs and roles"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
                        @focus="focusField('experience')" 
                        @blur="blurField"
                      ></textarea>
                    </p>
                  </div>

                  <div class="relative">
                    <a name="qualifications"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal text-gray-800 mb-2"
                    >
                      Relevant Qualifications &amp; Training
                    </h4>

                    <alerts-component 
                      v-if="pending_changes.qualifications"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                    />
                    <alerts-component 
                      v-if="rejected_changes.qualifications"
                      :detail='rejected_changes.qualifications'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                    />
                    
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <span class="field-value" v-show="!showField('qualifications')" v-on:click.stop.prevent="removeFocus" @click="focusField('qualifications')">
                        <span v-html="qualifications"></span>
                        <span v-if="!qualifications" class="text-gray-500">Any qualifications you have or training you've attended.</span>
                      </span>
                      <textarea
                        ref="qualifications"
                        v-model="qualifications" 
                        v-show="showField('qualifications')"
                        type="text" 
                        rows="5"
                        placeholder="Any qualifications you have"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
                        @focus="focusField('qualifications')" 
                        @blur="blurField"
                      ></textarea>
                    </p>
                  </div>

                  <div class="relative">
                    <a name="attributes"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal text-gray-800 mb-2"
                    >
                      Personal Attributes/Competences
                    </h4>

                    <alerts-component 
                      v-if="pending_changes.attributes"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                    />
                    <alerts-component 
                      v-if="rejected_changes.attributes"
                      :detail='rejected_changes.attributes'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                    />
                    
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <span class="field-value" v-show="!showField('attributes')" v-on:click.stop.prevent="removeFocus" @click="focusField('attributes')">
                        <span v-html="attributes"></span>
                        <span v-if="!attributes" class="text-gray-500">Any examples of team work, building relationships etc</span>
                      </span>
                      <textarea
                        ref="attributes"
                        v-model="attributes" 
                        v-show="showField('attributes')"
                        type="text" 
                        rows="5"
                        placeholder="Any examples of team work, building relationships etc"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
                        @focus="focusField('attributes')" 
                        @blur="blurField"
                      ></textarea>
                    </p>
                  </div>

                  <div class="relative">
                    <a name="websites"></a>
                    <h4
                      class="text-2xl font-semibold leading-normal text-gray-800 mb-2"
                    >
                      Personal Websites
                    </h4>

                    <alerts-component 
                      v-if="pending_changes.websites"
                      :alert_type='warning_alert.alert_type' 
                      :title='warning_alert.title'
                      :message='warning_alert.message'
                    />
                    <alerts-component 
                      v-if="rejected_changes.websites"
                      :detail='rejected_changes.websites'
                      :alert_type='error_alert.alert_type' 
                      :title='error_alert.title'
                      :message='error_alert.message'
                    />
                    
                    <p class="mb-4 text-lg leading-relaxed text-gray-800 mb-10">
                      <span class="field-value" v-show="!showField('websites')" v-on:click.stop.prevent="removeFocus" @click="focusField('websites')">
                        <span v-html="websites"></span>
                        <span v-if="!websites" class="text-gray-500">Any websites showcasing your skills and expertise</span>
                      </span>
                      <textarea
                        ref="websites"
                        v-model="websites" 
                        v-show="showField('websites')"
                        type="text" 
                        rows="5"
                        placeholder="Any websites showcasing your skills and expertise"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
                        @focus="focusField('websites')" 
                        @blur="blurField"
                      ></textarea>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <modal-component v-if="isModalVisible"
      :title="modal.title"
      :content="modal.content"
      :action_text="modal.action_text"
      :close_text="modal.close_text"
      :show_modal="isModalVisible"
      :modal_detail="modal.detail"
      @close="closeModal()"
      @action="actionModal"
       >
       <template v-slot:inputs>
         <label class="mt-3 pt-3 font-bold placeholder-gray-600 w-full text-sm">
           Email
         </label>
         <input 
          ref="new_email"
          v-model="new_email.email" 
          type="text" 
          name="new_email" 
          placeholder="hello@leighton.com" 
          class="my-3 px-3 py-3 placeholder-gray-600 w-full border-2 rounded text-sm shadow focus:outline-none focus:shadow-outline" 
        />

         <label class="mt-3 pt-3 font-bold placeholder-gray-600 w-full text-sm">
           Email Confirm
         </label>
         <input          
          ref="new_email_confirm"
          v-model="new_email.email_confirm" 
          type="text"
          name="new_email_confirm" 
          placeholder="hello@leighton.com" 
          class="my-3 px-3 py-3 placeholder-gray-600 w-full border-2 rounded text-sm shadow focus:outline-none focus:shadow-outline" 
         />

         <p v-if="new_email.error" class="text-red-500 font-semibold text-s px-2 pb-2">{{ new_email.error }}</p>
         
       </template>
    </modal-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { upload } from '~/services/file-upload';
import AlertsComponent from "~/components/Alerts.vue";
import ModalComponent from "~/components/Modal.vue";

import axios from "axios";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default Vue.extend({
  name: "profile-view",
  middleware: 'auth',
  components: {
    AlertsComponent,
    ModalComponent
  },

  data() {
      return {
        modal: {
          title: 'Email Address Change',
          content: '',
          action_text: 'Change',
          close_text: 'Cancel',
          detail: ''
        },
        new_email: {
          email: '',
          email_confirm: '',
          error: ''
        },
        isModalVisible: false,
        email_address: '',
        talent_id: '0',
        download_link: '/download/',
        profile_image: require('~/assets/img/Silhouette.png'),
        full_name: '',
        job_title: '',
        location: '',
        contact_number: '',
        summary: '',
        detail: '',
        experience: '',
        qualifications: '',
        attributes: '',
        websites: '',
        pending_changes: [],
        rejected_changes: [],
        
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'profileImage',
        editField : '',
        warning_alert : {
          alert_type : 'warning', 
          title : 'Pending', 
          message : 'Your change is pending approval'
        },
        error_alert : {
          alert_type : 'error', 
          title : 'Error', 
          message : 'Your change has been rejected.',
          detail : ''
        }
      }
  },
  methods: {
    async showModal(data) {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async actionModal(e) {
      if (this.new_email.email != this.new_email.email_confirm) {
        this.new_email.error = 'Emails do not match, please check and try again.';
        return false;
      } else {
        let changeEmail = await this.$store.dispatch({
          type: 'auth/changeEmail',
          email: this.new_email.email
        })

        if (typeof changeEmail.message !== 'undefined') {
          this.new_email.error = changeEmail.message;
          return false;
        } else {
          await this.saveData('email', this.new_email.email);

          this.email_address = this.new_email.email
          this.isModalVisible = false
          this.new_email.email = ''
          this.new_email.email_confirm = ''
          this.$parent.$parent.verifyEmailModal();
        }
      }
      return true;
    },
    fileChoice () {
    	this.$refs.fileChoice.click();
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      upload(formData, this.$auth.user.signInUserSession.idToken.jwtToken)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });
      
      // save it
      this.save(formData);
    },
    removeFocus() {
      //this.editField = '';
    },
    focusField(name) {
      this.editField = name;

      Vue.nextTick(() => {
        this.$refs[name].focus();
      });
    },
    blurField() {
      if (this.editField != '' && name != this.editField) {
        this.saveData(this.editField, this[this.editField])
      }
      this.editField = '';
    },
    showField(name) {
      //return (this[name] == '' || this.editField == name)
      return (this.editField == name)
    },
    saveData(field, value) {
      if (this.email_address != '') {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
        }
        const data = { email_address: this.email_address };
        
        data[field] = value;
        axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/update", 
          data,
          { headers: headers }
        )
        .then(response => {
          this.data = response.data.result;
          this.pending_changes[field] = "true";
          delete this.rejected_changes[field];
        })
        .catch(error => {
          console.log(error)
        });
      }
    }
  },
  mounted() { 
    this.reset();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.$auth.user.signInUserSession.idToken.jwtToken
    }
    var data = { "viewType" : 'manage' };
    if (typeof this.$route.params.id != 'undefined') {
      data['id'] = this.$route.params.id
    }
    axios.post("https://ek6z7oe5pk.execute-api.eu-west-2.amazonaws.com/prod/retrieve", 
      data,
      { headers: headers }
    )
    .then(async response => { 
      //Handle no returned data
      if (typeof response.data.result == 'undefined' || response.data.result.length == 0) {
        if (typeof this.$route.params.id == 'undefined') {
          //Create the data if it's for my account
          await this.$store.dispatch('profile/create', {email: this.$auth.user.attributes.email, fullName: ''})
          
          this.$router.push('/manage');
        } else {
          //You probably don't have the correct access, sorry
          this.$router.push('/');
        }
      } else {
        this.talent_id = response.data.result.id;
        this.email_address = response.data.result.email;
        this.download_link = '/download/'+response.data.result.id+'/';
        this.full_name = response.data.result.full_name;
        this.job_title = response.data.result.job_title;
        this.location = response.data.result.location;
        this.contact_number = response.data.result.contact_number;
        this.summary = response.data.result.summary;
        this.detail = response.data.result.detail;
        this.experience = response.data.result.experience;
        this.qualifications = response.data.result.qualifications;
        this.attributes = response.data.result.attributes;
        this.websites = response.data.result.websites;
        this.pending_changes = typeof response.data.result.pending != 'undefined' ? response.data.result.pending : [];
        this.rejected_changes = typeof response.data.result.rejected != 'undefined' ? response.data.result.rejected : [];
      }
    })
    .catch(error => {
      console.log(error)
    });
  },
  computed: {
    cssVars() {
      return {
        '--bg-profile': this.profile_image
      }
    },
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  }
})

import "@fortawesome/fontawesome-free/css/all.min.css";
</script>
<style type="text/css">
  .profile-headline i {
    width: 24px;
    text-align: center;
  }

  .profile-image-upload {
    width: 150px;
    height: 150px;
    cursor: pointer;
    display: block;
    position: relative;
    background-size: contain;
  }

  .profile-image-upload::after {
    content: "";
    background:#fff;
    background-image: attr(profile_image url);
    border-radius: 9999px;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;   
  }

  .profile-image-upload .input-file {
    opacity: 0; /* invisible but it's there! */
    top:-5px;
    left:-5px;
    width: 150px;
    height: 150px;
    position: absolute;
    cursor: pointer;
  }

  .profile-image-upload p {
    font-size: 0.6em;
    text-align: center;
    padding: 0 5px;
    margin: 20% 0 0;
    width: 89px;
    box-sizing: content-box;
    line-height: 1.2;
  }

  .profile-image-upload svg{
    height: 163px;
    width: 163px;
  }
  .profile-image-upload circle {
    fill: transparent;
    stroke: grey;
    stroke-width: 2;
  }
  .profile-image-upload:hover circle {
    stroke: #D1683B;
    stroke-width: 4;
    background: #fff;
  }
  .profile-image-upload .dashed {
    stroke-dasharray: 8, 8.5;
  }
  .profile-image-upload div {
    height: 163px;
    width: 163px;
    color: #000;
    font-weight: bolder;
    text-align: center;
    line-height: 163px;
  }
</style>