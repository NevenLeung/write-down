import FileSaver from "file-saver";

/**
 * exportFile() 使用 FileSaver.js 实现文件下载功能
 *
 * FileSaver.js 只提供下载功能，不具备文件类型转换的功能，需要根据需要自行转换文件格式
 *
 * @param data  作为数据段生成 blob 类型文件
 * @param type  文件的 MIME 类型
 * @param fileName  文件名。免除用户自行输入，利用相关数据预先设置好
 */
function exportFile(data, type, fileName) {
  const blob = new Blob([data], {type: type});
  FileSaver.saveAs(blob, fileName);
}

export default exportFile;