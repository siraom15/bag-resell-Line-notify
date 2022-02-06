import cron from 'node-cron';
import { getDataAndSend } from './helper/message.js';

// send in every hour
cron.schedule('0 0 */1 * * *', async () => {
  getDataAndSend();
});
