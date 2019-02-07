import PouchDB from "pouchdb";
import pouchdb_find from 'pouchdb-find';

import mockData from "./data";

PouchDB.plugin(pouchdb_find);

const db = new PouchDB("Write Down", { auto_compaction: true });

const bulkDocsData = mockData.map(article => {
  article._id = "article_" + article.id;
  return article;
});

const createDoc = async (db, doc) => {
  let result = undefined;

  try {
    const createResult = await db.put(doc);
    // {ok: true, id: "login data", rev: "1-b08b103efa5095017319f41a75f34f39"}

    result = await db.get(createResult.id);
    // result = await db.allDocs({ include_docs: true });
  } catch (error) {
    console.log(error);
  }

  return result;
};

const getDoc = async (db, id) => {
  let result = undefined;

  try {
    result = await db.get(id);
    // result will be the doc object.
  } catch (error) {
    console.log(error);
  }

  return result;
};

const updateDoc = async (db, id, change) => {
  let result = undefined;

  try {
    const doc = await db.get(id);

    const updateResult = await db.put({
      ...doc,
      ...change
    });
    // {ok: true, id: "login data", rev: "2-5d05eb34abc05e2208ed3d46dd721219"}

    result = await db.get(updateResult.id);
    // result = await db.allDocs({ include_docs: true });
  } catch (error) {
    console.log(error);
  }

  return result;
};

const removeDoc = async (db, id) => {
  let result = undefined;

  try {
    const doc = await db.get(id);

    result = await db.remove(doc);
    // result = await db.allDocs({ include_docs: true });
  } catch (error) {
    console.log(error);
  }

  return result;
};

const getDocsByType = async (db, type) => {
  let result = undefined;

  try {
    const index = {
      index: {
        fields: ['postedAt'],
        name: 'posted-time-index',
        ddoc: 'posted-time-index-design-doc'
      }
    };

    await db.createIndex(index);
    // const res = await db.createIndex(index);
    // console.log('Create index successfully with response: ');
    // console.log(res);

    const regExp = new RegExp(type);

    let option = {
      selector: {
        _id: {
          $regex: regExp
        }
      }
    };

    if (type === 'article') {
      // Fetch article documents by the field postedAt with descending order.
      option = {
        selector: {
          _id: {
            $regex: regExp
          },
          postedAt: {
            $gt: ''
          }
        },
        sort: [{
          postedAt: 'desc'
        }]
      };
    }

    result = await db.find(option);
  } catch (error) {
    console.log(error);
  }

  return result;
};

const getTheStoredArticles = async (db, mockData) => {
  let articles = [];

  try {
    // console.log('Check if data exits');
    articles = await getDocsByType(db, 'article');

    // The data is in articles.docs.
    if (!articles.docs || articles.docs.length === 0) {
      // Insert the mock data to database.
      await db.bulkDocs(mockData);
      // [
      //   {ok: true, id: "article_0", rev: "1-5b5ef78302fe3bde3deb9673ee8e209d"}
      //    ...
      //   {ok: true, id: "article_4", rev: "1-6dce3abb1718ab92692db76cd3a60ef7"}
      // ]

      articles = await getDocsByType(db, 'article');
    }
  } catch (error) {
    console.log(error);
  }

  // The data is in articles.docs
  return articles;
};

const loadArticles = async () => {
  return getTheStoredArticles(db, bulkDocsData);
};

const getTheLoginData = async (db) => {
  let loginData = {};

  try {
    loginData = await getDoc(db, 'login data');
  } catch (error) {
    console.log(error);
  }

  return loginData;
};

const dataInitialize = async (db, mockData) => {
  let preLoadedState = {};

  try {
    const articles = await getTheStoredArticles(db, mockData);
    const loginData = await getTheLoginData(db);

    // Construct the pre loaded state object for redux.
    if (articles && articles.length !== 0) {
      preLoadedState = {
        articles: {
          data: articles
        }
      };
    }

    if (loginData && Object.keys(loginData).length !== 0) {
      const { username, password } = loginData;

      preLoadedState = {
        ...preLoadedState,
        user: {
          loginData: {
            username,
            password
          }
        }
      }
    }

  } catch (error) {
    console.log(error);
  }

  return preLoadedState;
};

const loadData = async () => {
  return dataInitialize(db, bulkDocsData);
};

export {
  db,
  bulkDocsData,
  createDoc,
  getDoc,
  getDocsByType,
  updateDoc,
  removeDoc,
  loadArticles,
  loadData
};