/**
 * delay() 生成一个异步的延时
 *
 * @param timeout  延时时间。单位为ms
 * @return {Promise<any>}
 */
function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default delay;