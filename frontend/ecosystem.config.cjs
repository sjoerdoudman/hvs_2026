module.exports = {
  apps: [
    {
      name: 'Salomon',
      port: '2026',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
