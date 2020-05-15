<template>
<div class="absolute w-auto mx-auto alert-container top-0 right-0">
    <div class="invisible relative mx-2 mb-2">
        <div class="bg-gray-600 text-white text-xs rounded py-0 px-2 right-0 bottom-full">
        {{ message }}<br />
        <strong>Reason:</strong> {{ detail }}
        <svg class="absolute text-gray-600 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </div>
    </div>
    <div v-bind:class="alertColours" class="border-b-4 rounded-full px-2 py-1 shadow-md mx-auto" style="width:fit-content;" role="alert">
        <span class="flex">
            <div class="py-1">
                <svg class="fill-current text-white h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
            </div>
        </span>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      }
  },
  props: ['alert_type', 'title', 'message', 'detail'],
  computed: {
    alertColours: function () {
      return {
        'bg-teal-100 border-teal-500 text-teal-900': this.alert_type && this.alert_type === 'success',
        'bg-gray-600 border-gray-400 text-gray-900': this.alert_type && this.alert_type === 'information',
        'bg-orange-600 border-orange-400 text-orange-900': this.alert_type && this.alert_type === 'warning',
        'bg-red-600 border-red-400 text-red-900': this.alert_type && this.alert_type === 'error'
      }
    }
  }
}
</script>
<style>
.alert-container:hover > div {
    visibility: visible;
}
</style>