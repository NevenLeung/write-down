import FileSaver from 'file-saver';

/**
 * delay 生成一个异步的延时
 *
 * @param timeout
 * @return {Promise<any>}
 */
function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * checkImageUrlIsValid 检查url是否是合法的
 *
 * @param url
 * @return {Promise<any>}
 */
function checkImageUrlIsValid(url) {
  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.onload = function() {
      resolve(url);
    };

    img.onerror = function(){
      reject('The url of image is invalid.');
    };

    img.src = url;
  });
}

function exportFile(data, type, fileName) {
  const blob = new Blob([data], {type: type});
  FileSaver.saveAs(blob, fileName);
}

export {
  delay,
  checkImageUrlIsValid,
  exportFile
}