import { bags } from '../../data/bags.js';
import fetch from 'node-fetch';

export async function checkBySkuId(skuid) {
  try {
    const body = `sku=${skuid}&qty=1&typeId=configurable`;
    const response = await fetch(
      'https://atreasureboxofficial.com/checkStock',
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
        },
        body: body,
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function checkAll() {
  let result = [];
  try {
    for (let i = 0; i < bags.length; i++) {
      const data = await checkBySkuId(bags[i].sku);
      result.push({
        bagName: bags[i].name,
        qty: data.totalStock.qty,
        isAvaiable: data.totalStock.qty > 0,
        full_data: data,
        buyUrl : bags[i].buyUrl
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
