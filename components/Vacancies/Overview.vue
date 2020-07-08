<template>
<div>
    <h2 class="mb-4">Overview</h2>
    <div class="rounded-md shadow bg-gray-200 border border-gray-400 w-full py-4">
        <ul class="relative w-full flex flex-wrap text-xs">
            <li v-if="vacancy.internal_contact && vacancy.internal_contact.name" class="px-6 pb-4 whitespace-no-wrap w-full flex flex-wrap">
                <i class="fa fa-user-md w-6 pt-1 text-purple-700"></i>
                <div class="w-auto">
                    <span class="font-semibold block">Internal Contact:</span>
                    <span class="block"> {{ vacancy.internal_contact.name }}</span>
                </div>
            </li>
            <li class="px-6 pb-4 whitespace-no-wrap w-full flex flex-wrap">
                <i class="fa fa-id-badge w-6 pt-1 text-purple-700"></i>
                <div class="w-auto">
                    <span class="font-semibold block">Job Title:</span>
                    <span class="block"> {{ vacancy.job_title }}</span>
                </div>
            </li>
            <li v-if="vacancy.location || vacancy.location_basic" class="px-6 pb-4 whitespace-no-wrap w-full flex flex-wrap">
                <i class="fa fa-map-marked-alt w-6 pt-1 text-purple-700"></i>
                <div class="w-auto">
                    <span class="font-semibold block">Location:</span>
                    <span class="block" v-if="vacancy.location" v-html="formatLocation(vacancy.location)"></span>
                    <span class="block" v-else v-html="vacancy.location_basic"></span>
                </div>
            </li>
            <li  v-if="vacancy.hours" class="px-6 pb-4 whitespace-no-wrap w-full flex flex-wrap">
                <i class="fa fa-clock w-6 pt-1 text-purple-700"></i>
                <div class="w-auto">
                    <span class="font-semibold block">Hours:</span>
                    <span class="block" v-html="vacancy.hours"></span>
                </div>
            </li>
            <li v-if="vacancy.rate" class="px-6 pb-4 whitespace-no-wrap w-full flex flex-wrap">
                <i class="fa fa-money-bill w-6 pt-1 text-purple-700"></i>
                <div class="w-auto">
                    <span class="font-semibold block">Rate:</span>
                    <span class="block" v-html="vacancy.rate"></span>
                </div>
            </li>
        </ul>
        <p class="text-center mb-2">
            <a v-if="vacancy.application_link" :href="vacancy.application_link" target="_blank" class="btn bg-purple-700">
                Apply for this job
            </a>
        </p>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: ['vacancy'],
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    },
    formatLocation: function(location) {
      return location.replace(/,/g, '<br />');
    },
  }
}
</script>