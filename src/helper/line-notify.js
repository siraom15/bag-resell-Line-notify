import 'dotenv/config';
import fetch from 'node-fetch';

export async function pushNotify(message) {
  let formData = {
    message,
  };
  let formBody = [];
  for (let property in formData) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(formData[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const response = await fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Bearer ${process.env.LINE_TOKEN}`,
    },
    body: formBody,
  });
  const data = await response.json();
  return data;
}