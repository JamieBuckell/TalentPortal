<script>
  export default {
    name: 'modal',
    props: ['title', 'content', 'action_text', 'close_text', 'modal_detail', 'secondary_action_text', 'action_data'],
    methods: {
      close() {
        this.$emit('close');
      },
      action() {
        this.$emit('action', this.$slots.inputs, this.action_data);
      },
      secondary_action() {
        this.$emit('secondary_action', this.$slots.inputs, this.action_data);
      },
    },
  };
</script>
<template>
  <transition name="modal-fade">
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto z-50">
        
        <div @click="close()" class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">{{ title }}</p>
            <div @click="close()" class="modal-close cursor-pointer">
              <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <!--Body-->
          <p v-html="content"></p>
          <slot name="inputs"></slot>

          <!--Footer-->
          <div class="flex justify-end pt-2">
            <button @click="action()" class="bg-purple-700 text-white active:bg-purple-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">{{ action_text }}</button>
            <button v-if="secondary_action_text" @click="secondary_action()" class="bg-blue-700 text-white active:bg-blue-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">{{ secondary_action_text }}</button>
            <button @click="close()" class="bg-gray-500 text-white active:bg-gray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">{{ close_text }}</button>
          </div>
          
        </div>
      </div>
    </div>
  </transition>
</template>