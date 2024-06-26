import { marked } from 'marked';

export const parseMarkdown = (markdown: string) => {
  return marked.parse(markdown);
};

export const removeTags = (html: string) => {
  const parseMarkdown: any = marked.parse(html);
  const cleanHTML = parseMarkdown.replace(/<\/?[^>]+(>|$)/gi, '');
  const replaceBr = cleanHTML.replace(/\n+/g, '<br>'); // 改行コードを<br>に変換
  return replaceBr;
};
