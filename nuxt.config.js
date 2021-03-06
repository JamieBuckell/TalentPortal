module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
 loading: {
    color: '#2d3748',
    height: '3px',
    duration: 4000
  },
  loadingIndicator: {
    name: 'circle',
    color: '#2d3748'
  },
  /*
  ** Global CSS
  */
  css: [
    'assets/css/talent.css',
    'quill/dist/quill.snow.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/amplify.js', mode: 'client' }, 
    { src: '~/plugins/auth' }, 
    { src: '~/plugins/vue-table', ssr: false },
    { src: '~plugins/quill', ssr: false }
  ],
  /*
  ** Server Middleware
  */
  serverMiddleware: [
    '~/servermiddleware/redirects.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],

  /*
  ** Nuxt Axios settings
  */
  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    vendor: ['vuetable-2']
  },
  purgeCSS: { enabled: false }
}
