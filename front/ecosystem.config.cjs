// eslint-disable-next-line no-undef
module.exports = {
  apps : [
      {
      name   : "playsy front-1",
      script : "serve -s -l 8080 dist",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name   : "playsy front-2",
      script : "serve -s -l 8081 dist",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: 'production',
      },
    }
  ]
}