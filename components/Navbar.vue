<template>
  <nav
    class="z-40 top-0 absolute w-full flex flex-wrap w-full items-center justify-between px-2 py-3 navbar-expand-lg"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
          href="/"
          >Leighton Talent Portal</a
        ><button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
        v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          
          <li v-if="isAdmin" class="flex items-center">
            <a
              class="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
              href="/admin"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-user"></i> Admin
            </a>
          </li>
          <li v-if="$auth.isAuthenticated" class="flex items-center">
            <a
              class="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
              href="/manage"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-user"></i> My Profile
            </a>
          </li>
          <li v-if="$auth.isAuthenticated" class="flex items-center">
            <button
              class="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
              type="button"
              @click="$store.dispatch('auth/logout')"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
          <li v-if="!isLogin && !$auth.isAuthenticated" class="flex items-center">
            <a
              class="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
              href="/login"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-user-lock"></i> Sign In / Register
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
      isAdmin: false,
      isLogin: this.$route.path === '/login'
    }
  },
  mounted() {
    const userGroups = (this.$auth.isAuthenticated && this.$auth.user.signInUserSession.accessToken.payload["cognito:groups"]) ? this.$auth.user.signInUserSession.accessToken.payload["cognito:groups"] : [];
    if (userGroups.indexOf("SuperAdmin") != -1) {
      this.isAdmin = true;
    } else if (userGroups.indexOf("TalentAdmin") != -1) {
      this.isAdmin = true;
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
