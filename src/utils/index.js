import FileSaver from 'file-saver';

/**
 * delay() 生成一个异步的延时
 *
 * @param timeout  延时时间。单位为ms
 * @return {Promise<any>}
 */
function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * checkImageUrlIsValid() 检查url是否是合法的
 *
 * @param url  图片的url地址
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


/**
 * getAllDataFromDatabase()  获取某个数据库的所有数据
 *
 * @param db  db为pouchDB的实例
 * @return {Promise<*>}
 */
async function getAllDataFromDatabase(db) {
  try {
    const data = await db.allDocs({include_docs: true});

    let result = {};

    data.rows.map((item) => result[item.id] = item.doc.state);

    // console.log(result);
    // return result;
    return data;
  } catch (e) {
    console.log(e);

    return undefined;
  }
}

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

/**
 * generateStyledHTML() 生成带有样式的 .html 文件，供 exportFile() 使用
 *
 * @param title  html 文件的标题
 * @param content  markdown的内容主题
 */
function generateStyledHTML(title, content) {
  const html =
    `
    <html>
      <header>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prism-themes@1.0.1/themes/prism-darcula.css">
        <style>
          .emoji {
            height: 1.2em;
          }
          
          /*
          github markdown style
          */
          
          .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
          }
        
          @media (max-width: 767px) {
            .markdown-body {
              padding: 15px;
            }
          }
          
          /*
          some optimization to the code block.
          */
          
          .token.keyword {
            font-weight: 900;
          }
          
          .token.inserted {
            color: #50fa7b;
            background: transparent;
          }

          .token.deleted {
            color: #ff5555;
            background: transparent;
          }

        </style>
      </header>
      <body>
        <article class="markdown-body">
          ${content}
        </article>
      </body>
    </html>
  `;

  return html;
}

export {
  delay,
  checkImageUrlIsValid,
  getAllDataFromDatabase,
  exportFile,
  generateStyledHTML
}