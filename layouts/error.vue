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
              {{ error.message}}
            </h1>
            <p class="text-sm text-white font-semibold opacity-75">
              Ummmm... oops?
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
          <a href="/" class="font-semibold">Home</a> &gt;
          <a href="/"
             v-if="error.statusCode === 404 || error.message == 'This page could not be found'">I'm not sure where you were going, but i'm guesssing this aint right...</a>
          <a href="/"
             v-else>Error</a>
        </div>
      </div>
    </section>

    <section class="relative pb-24 bg-gray-300"
      style="min-height: 70vh;">
      <div class="container mx-auto px-4">
        <div class="py-8 px-4 flex flex-wrap text-gray-800">
          <div class="flex flex-wrap w-full items-start pr-6 order-1">
            <h2 class="text-4xl font-semibold mb-4">
              {{ error.message}}
            </h2>
          </div>
          <div class="flex flex-wrap w-full sm:w-6/12 items-start pr-6 order-3 sm:order-2">
            <p 
              class="my-4 text-md text-gray-800"
              v-if="error.statusCode === 404 || error.message == 'This page could not be found'">
              Remember those old 404 pages from the 90s that said something like 
              &quot;Something’s gone wrong, but don’t worry, our webmasters have been notified.&quot;
              How many webmasters do you think ever got notified?
            </p>
            <p class="my-4 text-md text-gray-800"
               v-else>
              I'm not sure where you were doing, but whatever it is, it's not working...
            </p>
          </div>
          <div class="flex flex-wrap w-full sm:w-6/12 items-center pr-6 order-1 sm:order-2">
              <img
                  alt="..."
                  src="../assets/img/electric-plug-error.jpg"
                  class="shadow-lg rounded-full max-w-full mx-auto"
                />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>