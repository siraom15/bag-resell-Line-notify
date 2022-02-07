import cron from 'node-cron';
import { getDataAndSend } from './helper/message.js';

// work every 30 mins
console.info('App Start');
cron.schedule('0 */30 * * * *', async () => {
  console.info('Cron Start');
  getDataAndSend();
});
