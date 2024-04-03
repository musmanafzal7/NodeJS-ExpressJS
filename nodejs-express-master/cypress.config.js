const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
      
          return null
        },
      })
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
    baseUrl: 'http://localhost:3002'
  },
  chromeWebSecurity: false
});
