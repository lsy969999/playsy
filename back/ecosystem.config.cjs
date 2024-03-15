// pm2 미사용 전환

// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'playsy back-1',
      script: 'npm run start:prod',
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        SERVER_PORT: 7080,
      },
    },
    {
      name: 'playsy back-2',
      script: 'npm run start:prod',
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        SERVER_PORT: 7081,
      },
    },
  ],
};
