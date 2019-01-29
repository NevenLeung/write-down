// internal
import checkImageUrlIsValid from "./internal/checkImageUrlIsValid";
import delay from "./internal/delay";
import exportFile from "./internal/exportFile";
import generateStyledHTML from "./internal/generateStyledHTML";
import ScrollToTop from './internal/ScrollToTop';

// external
import MarkdownParser from './external/MarkdownParser';
import { unsplash, toJson } from "./external/unsplash-service";

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

export {
  checkImageUrlIsValid,
  delay,
  exportFile,
  generateStyledHTML,
  getAllDataFromDatabase,
  MarkdownParser,
  ScrollToTop,
  toJson,
  unsplash
}
