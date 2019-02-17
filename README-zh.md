# Write Down

一个使用 React 编写的基于 markdown 的博客应用。

Write Down 的文章仅支持使用 markdown 进行编写。其中 markdown 语法标准为 GFM，且额外支持几种功能，如 Emoji 表情、上下标文字等（具体可到 [Demo](https://nevenleung.github.io/write-down/) 里的 full feature example 中进行查看）

[README in English](https://github.com/NevenLeung/write-down/blob/master/README.md)

## Demo

[Demo Link](https://nevenleung.github.io/write-down/)

> 需要登录以后才能看到文章的编辑选项和创建新的文章。以下为测试账号：

| username | password |
| :------: | :------: |
| test     | 123456   |

---

![Articles List](https://github.com/NevenLeung/write-down/blob/master/demo/articles-list.jpg)

<p align="center">Article List</p>

---

![Article Reading Page](https://github.com/NevenLeung/write-down/blob/master/demo/article-reading-page.jpg)

<p align="center">Article Reading Page</p>


## 功能列表

### 文章系统

- 文章编辑
  - markdown 的编辑
    - [x] 编辑与预览的模式切换
    - [x] 编辑框与预览框的滚动同步
    - [x] 根据 markdown 语法给出相应的代码高亮（自己写的 CodeMirror 配色主题）
    - [ ] 支持语法的快捷输入（内置snippet）
  - 其他元素的编辑
    - [x] 设置文章标签
    - [x] 设置文章内容摘要
    - [x] 通过关键字搜索与设置题图（及文章列表封面图片）
    - [x] 文章信息预览（把鼠标悬停在 Info Setting Button 上显示）
- 文章管理
  - [x] 新建文章
  - [x] 发布文章\存至草稿箱
  - [x] 更新文章
  - [x] 删除文章
- 文章导出
  - [x] markdown文件
  - [x] 带样式的html文件
- 文章存储
  - [x] 本地存储

### 用户系统

- [x] 用户登录\登出 (目前仅支持特定用户的登录)


## 功能演示

![Articles List](https://github.com/NevenLeung/write-down/blob/master/demo/articles-list.gif)

<p align="center">Article List</p>

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


## [Write Down的数据 - ProcessOn](https://www.processon.com/view/link/5c2110f8e4b056243683909e)


## 项目使用的框架、工具与第三方库

JS框架、状态管理器、前端路由

- [React](https://github.com/facebook/react/)
- [Redux](https://github.com/reactjs/redux/)
- [React-Router](https://github.com/ReactTraining/react-router)

文本编辑器、markdown解释器、代码高亮

- [CodeMirror](https://github.com/codemirror/CodeMirror/)
- [markdown-it](https://github.com/markdown-it/markdown-it/)
- [Prism](https://github.com/PrismJS/prism/)

UI组件

- [Ant Design](https://github.com/ant-design/ant-design/)

本地存储

- [PouchDB](https://github.com/pouchdb/pouchdb/)

文件导出

- [File Saver](https://github.com/eligrey/FileSaver.js/)

日期转换

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