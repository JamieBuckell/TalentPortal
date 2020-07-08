<template>
  <footer class="relative w-full bottom-0 bg-gray-900 pb-6">
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
      <hr class="mb-6 border-b-1 border-gray-700" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-6/12 px-4 order-2 md:order-1">
          <div class="text-sm text-white font-semibold py-1 text-center md:text-left">
            Copyright © {{date}}
            <a
              href="https://www.leighton.com"
              class="text-white hover:text-gray-400 text-sm font-semibold py-1"
              >Leighton Corporation Limited</a
            >
          </div>
        </div>
        <div class="w-full md:w-6/12 px-4 order-1 md:order-2">
          <ul
            class="flex flex-wrap list-none md:justify-end justify-center"
          >
            <li>
              <a
                href="https://www.leighton.com/about-us/"
                target="_blank"
                class="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                >About Us</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
}
</script>
