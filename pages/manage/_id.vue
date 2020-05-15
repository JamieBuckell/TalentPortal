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
        <div class="container mx-auto px-4" @click="removeFocus()">
          <div
            class="relative flex flex-col min-w-0 break-words bg-gray-300 w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                
                <div
                  class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                >
                  <div class="relative">
                    <!-- -->
                    <form enctype="multipart/form-data" novalidate> 
                      <div 
                        class="profile-image-upload shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        :style="{ backgroundImage: `url(${profile_image})` }"
                         v-on:click="fileChoice()"
                      >
                        <svg viewBox="0 0 120 120">
                          <circle cx="55" cy="55" r="50" class="dashed" />
                          <foreignObject x="5" y="5" height="163px" width="163px">
                            <div>
                              <input type="file" ref="fileChoice" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                              accept="image/*" class="input-file">
                              <p v-if="isInitial">
                                Drag your file(s) here to begin<br> or click to browse
                              </p>
                              <p v-if="isSaving">
                                Uploading {{ fileCount }} files...
                              </p>
                            </div>
                          </foreignObject>
                        </svg>
                      </div>
                    </form>
                    <!-- -->
                  </div>
                </div>
                <!-- --
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
                <!-- -->
                <div
                  class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
                >
                
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
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4"> 
                    <div class="relative">
                      <span class="block text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2 edit-field">
                        <span class="field-value" v-show="!showField('full_name')" v-on:click.stop.prevent="removeFocus" @click="focusField('full_name')">
                          {{ full_name }}<span v-if="!full_name" class="text-gray-500">Full Name</span>
                        </span>
                        <input
                          ref="full_name"
                          v-model="full_name"
                          v-show="showField('full_name')"
                          type="text"
                          placeholder="Full Name"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center"
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

                    <div class="relative">
                    <span class="block text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2 edit-field">
                      <span class="field-value" v-show="!showField('job_title')" v-on:click.stop.prevent="removeFocus" @click="focusField('job_title')">
                        {{ job_title }}<span v-if="!job_title" class="text-gray-500">Job Title</span>
                      </span>
                      <input
                        ref="job_title"
                        v-model="job_title" 
                        v-show="showField('job_title')" 
                        type="text" 
                        placeholder="Job Title"
                        class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
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

                    <div class="relative">
                      <span class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase edit-field">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                        <span class="field-value" v-show="!showField('location')" v-on:click.stop.prevent="removeFocus" @click="focusField('location')">
                          {{ location }}<span v-if="!location" class="text-gray-500">Houghton-le-Spring, Sunderland</span>
                        </span>
                        <input
                          ref="location"
                          v-model="location" 
                          v-show="showField('location')"
                          type="text" 
                          placeholder="Houghton-le-Spring, Sunderland"
                          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-6/12 text-center" 
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

                        
                  </div>
                </div>
              </div>
              <div class="mt-12 py-10 border-t border-gray-400 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">  
                    <div class="relative edit-field">
                      <a name="summary"></a>
                      <h4
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
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
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
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
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
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
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
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
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
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
                        class="text-2xl font-semibold leading-normal mb-2 text-gray-800 mb-2"
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
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { upload } from '~/services/file-upload';
import NavbarComponent from "~/components/Navbar.vue";
import FooterComponent from "~/components/Footer.vue";
import AlertsComponent from "~/components/Alerts.vue";

import axios from "axios";

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default Vue.extend({
  name: "profile-view",
  middleware: 'auth',
  components: {
    NavbarComponent,
    FooterComponent,
    AlertsComponent
  },

  data() {
      return {
        email_address: '',
        talent_id: '0',
        download_link: '/download/',
        profile_image: require('~/assets/img/Silhouette.png'),
        full_name: '',
        job_title: '',
        location: '',
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
        console.log('Saving ' + this.editField+' with ' + this[this.editField]);
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