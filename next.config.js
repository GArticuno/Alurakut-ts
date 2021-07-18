const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  env: {
    API_KEY: "AIzaSyCndIstGtC3avtK1pRXRwF3aPcA_hLWjdY",
    AUTH_DOMAIN: "alurakut-211a8.firebaseapp.com",
    PROJECT_ID: "alurakut-211a8",
    STORAGE_BUCKET: "alurakut-211a8.appspot.com",
    MESSAGING_SENDER_ID: "1054035815529",
    APP_ID: "1:1054035815529:web:bd9f6ce82847dce8f686f8",

    TOKEN: "4e644255be0143f167c63155534131"
  },
})
