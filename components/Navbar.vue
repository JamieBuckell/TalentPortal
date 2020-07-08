<template>
  <nav
    class="z-50 lg:z-40 top-0 absolute w-full flex flex-wrap w-full items-center justify-between px-2 py-3 navbar-expand-lg"
  >
    <div
      class="container px-2 lg:px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mx-4 py-2 uppercase text-white"
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
        class="lg:flex flex-grow items-center bg-gray-200 lg:bg-transparent lg:shadow-none"
        v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto shadow-lg lg:shadow-none">
          
          <li v-if="isAdmin" class="flex items-center">
            <a
              class="nav-link"
              href="/admin"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-user"></i> Admin
            </a>
          </li>
          <li v-if="$auth.isAuthenticated" class="flex items-center">
            <a
              class="nav-link"
              href="/vacancies"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-building"></i> Vacancies
            </a>
          </li>
          <li v-if="$auth.isAuthenticated" class="flex items-center">
            <a
              class="nav-link"
              href="/manage"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-user"></i> My Profile
            </a>
          </li>
          <li v-if="$auth.isAuthenticated" class="flex items-center">
            <button
              class="nav-link"
              type="button"
              @click="$store.dispatch('auth/logout')"
              style="transition: all 0.15s ease 0s;"
            >
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
          <li v-if="!isLogin && !$auth.isAuthenticated" class="flex items-center">
            <a
              class="nav-link"
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
