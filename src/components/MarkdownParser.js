import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import TOC from "markdown-it-table-of-contents";
import taskList from "markdown-it-task-lists";
import emoji from "markdown-it-emoji";
import hljs from "markdown-it-highlightjs";

const markdownOption = {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links
  typographer:  true,         // Enable smartypants and other sweet transforms
  quotes: '“”‘’',
};

const md = new MarkdownIt(markdownOption);

const anchorOption = {
  level: [1, 2, 3, 4, 5, 6]
};

const TOC_Option = {
  includeLevel: [1, 2, 3, 4, 5, 6]
};


const taskListOption = {
  enabled: true,
  label: true
};

md.use(anchor, anchorOption)
  .use(TOC, TOC_Option)
  .use(taskList)
  .use(emoji)
  .use(hljs);

export default md;
