import cron from 'node-cron';
import { getDataAndSend } from './helper/message.js';

// work every 30 mins
cron.schedule('0 */30 * * * *', async () => {
  getDataAndSend();
});
