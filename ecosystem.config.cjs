module.exports = {
   apps: [
      {
         name: "food",
         script: "app.js",
         watch: true,
         //ignore_watch: ['',],
         env: {
            PORT: 3300,
         },
      },
   ],
};
