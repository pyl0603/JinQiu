
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '今球app官网为用户提供即时足球赛事资讯,用户可在今球app官网在线观看赛事直播,原创新闻,精彩集锦等足球赛事资讯.一款专注足球赛事服务手机应用软件-今球app.' },
      { hid: 'keywords', name: 'keywords', content: process.env.npm_package_keywords || '今球app，今球app官网' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: "swiper/dist/css/swiper.css" },
    { src: "~/assets/css/base.css"}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: "~/plugins/axios", ssr: true },
    { src: "~/plugins/vue-swiper.js", ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  router: {
    middleware: 'auth'
  },
  // proxy: [
  //   ['/dqx', { target: 'https://api.jinqiulive.com/', pathRewrite: { '^/dqx': '/api/breeds/image/random' } }]
  // ],
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
