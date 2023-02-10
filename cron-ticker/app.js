// utilizando node cron:


const cron = require ('node-cron');
const { syncDb } = require('./task/sync-db');

// hacer que el codigo se ejecute cada 5 segundos:

console.log('Inicio')

cron.schedule('1-59/5 * * * * * ', syncDb)

