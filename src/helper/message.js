import { checkAll, checkBySkuId } from './check.js';
import { pushNotify } from './line-notify.js';

export async function getDataAndSend() {
  let data = await checkAll();
  let shouldSend = false;
  let message = '';
  data.forEach((e) => {
    if (e.isAvaiable) {
      shouldSend = true;
      message += `\nชื่อกระเป๋า : ${e.bagName}\n`;
      message += `พร้อมขาย : พร้อม 😀😀\n`;
      message += `ลิ้งค์สินค้า : ${e.buyUrl}\n`;
      message += `คงเหลือ : ${e.qty} ใบ\n==========\n`;
    }
  });
  message += `ข้อมูล ${new Date().toLocaleString()}\n`;
  message += `อัปเดตข้อมูลทุก 30 นาที`;
  if (shouldSend) {
    let result = await pushNotify(message);
    if (result.status === 200) {
      console.log('Send');
      console.log('Avaiable And Send Message');
    } else {
      console.log('Error');
      console.log(result);
    }
  }
}
