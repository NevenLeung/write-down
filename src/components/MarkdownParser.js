import MarkdownIt from "markdown-it";

import abbr from 'markdown-it-abbr';
import anchor from "markdown-it-anchor";
import deflist from 'markdown-it-deflist';
import emoji from "markdown-it-emoji";
import footnote from 'markdown-it-footnote';
import highlight from "markdown-it-highlightjs";
import imsize from 'markdown-it-imsize';
import mark from 'markdown-it-mark';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import taskList from "markdown-it-task-lists";
import TOC from "markdown-it-table-of-contents";

import twemoji from 'twemoji';

const markdownOption = {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      false,         // autoconvert URL-like texts to links
  typographer:  true,         // Enable smartypants and other sweet transforms
  quotes: '“”‘’',
};

const md = new MarkdownIt(markdownOption);

// todo: 没有起作用
const anchorOption = {
  level: [1, 2, 3, 4, 5, 6]
};

const imsizeOption = {
  autofill: true
};

const taskListOption = {
  enabled: true,
  label: true
};

const TOC_Option = {
  includeLevel: [1, 2, 3, 4, 5, 6]
};


md.use(abbr)
  .use(anchor, anchorOption)
  .use(deflist)
  .use(emoji)
  .use(footnote)
  .use(highlight)
  .use(imsize, imsizeOption)
  .use(mark)
  .use(sub)
  .use(sup)
  .use(taskList)
  .use(TOC, TOC_Option);

// change the output of emoji
md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content);
};

export default md;
