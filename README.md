# Write Down

A simple markdown blog app built with React.

The article in Write Down are using markdown to write. The markdown here is based on GFM, and it supports some additional features, like emoji, subscript, superscript and etc. (You can see those in the full feature example in [Demo](https://nevenleung.github.io/write-down/).)

[README 中文](https://github.com/NevenLeung/write-down/blob/master/README-zh.md)

## Demo

[Demo Link](https://nevenleung.github.io/write-down/)

> Only after logging in, you can see the editing option and create a new article. The following is the testing account:

| username | password |
| :------: | :------: |
| test     | 123456   |

---

![Articles List](https://github.com/NevenLeung/write-down/blob/master/demo/articles-list.jpg)

<p align="center">Article List</p>

---

![Article Reading Page](https://github.com/NevenLeung/write-down/blob/master/demo/article-reading-page.jpg)

<p align="center">Article Reading Page </p>


## Feature List

### Article System

- Edit article
  - Edit markdown
    - [x] Toggle editing and preview mode
    - [x] Sync scrolling of editing and preview panels
    - [x] Highlight the code of markdown according to its usage (I created the CodeMirror color theme)
    - [ ] Support some built-in snippets for markdown
  - Edit other elements
    - [x] Set the tags of article
    - [x] Set the title and excerpt of article
    - [x] Search the heading image based on keyword and set it (The heading image is also the cover of it in the article list)
    - [x] Preview the article info (Hovering on the **info setting button**)
- Manage article
  - [x] Create new article
  - [x] Publish article/save as draft
  - [x] Update article
  - [x] Removed article
- Export article
  - [x] Markdown file
  - [x] Styled HTML file
- Store article
  - [x] Local storage


### User System

- [x] User login/logout (Now it only supports specified user to log in)


## Showcase

![Articles List](https://github.com/NevenLeung/write-down/blob/master/demo/articles-list.gif)

<p align="center">Article List </p>

---

![User Login](https://github.com/NevenLeung/write-down/blob/master/demo/user-login.gif)

<p align="center">User Login</p>

---

![Article Editing Page](https://github.com/NevenLeung/write-down/blob/master/demo/article-content-editing.gif)

<p align="center">Article Editing Page</p>

---

![Article Editing Other Header Buttons](https://github.com/NevenLeung/write-down/blob/master/demo/article-editing-other-header-buttons.gif)

<p align="center">Article Editing Other Header Buttons</p>

---

![Article Editing Info Setting](https://github.com/NevenLeung/write-down/blob/master/demo/article-editing-info-setting.gif)

<p align="center">Article Editing Info Setting</p>

---

![Article Editing Info Setting Photo Search](https://github.com/NevenLeung/write-down/blob/master/demo/article-editing-info-setting-photo-search.gif)

<p align="center">Article Editing Info Setting Photo Search</p>


## [Data in Write Down - ProcessOn](https://www.processon.com/view/link/5c2110f8e4b056243683909e)

## Built With

JS framework, state manager, front-end router

- [React](https://github.com/facebook/react/)
- [Redux](https://github.com/reactjs/redux/)
- [React-Router](https://github.com/ReactTraining/react-router)

Text editor, markdown parser, code highlighting

- [CodeMirror](https://github.com/codemirror/CodeMirror/)
- [markdown-it](https://github.com/markdown-it/markdown-it/)
- [Prism](https://github.com/PrismJS/prism/)

UI components

- [Ant Design](https://github.com/ant-design/ant-design/)

Local storage

- [PouchDB](https://github.com/pouchdb/pouchdb/)

File export

- [File Saver](https://github.com/eligrey/FileSaver.js/)

Time transformation

- [DayJS](https://github.com/iamkun/dayjs)

## Scripts

Run

```
npm run start
```

Build

```
npm run build
```


## License

[MIT](https://github.com/NevenLeung/write-down/blob/master/LICENSE) © Neven Leung