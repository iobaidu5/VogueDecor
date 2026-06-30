import { parse as parseHtml } from 'node-html-parser';

const MATERIALS_MARKER =
  /<strong>Materials:<br>.*?<\/strong>|<strong>Materials:<br>|Materials:<br><\/strong>|Materials:<\/span><\/strong>|Materials:/i;

export function extractProductFeaturesHtml(htmlString: string): string {
  if (!htmlString) return '';

  const match = htmlString.match(MATERIALS_MARKER);
  if (!match || match.index == null) return '';

  return normalizeProductDetailsHtml(htmlString.slice(match.index));
}

export function normalizeProductDetailsHtml(html: string): string {
  let root = parseHtml(html, { comment: false });

  root.querySelectorAll('meta').forEach((node) => node.remove());

  root.querySelectorAll('strong, b').forEach((node) => {
    node.replaceWith(node.innerHTML);
  });

  root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((node) => {
    const paragraph = parseHtml(`<p>${node.innerHTML}</p>`);
    node.replaceWith(paragraph.firstChild ?? paragraph);
  });

  root.querySelectorAll('[style]').forEach((node) => {
    const style = node.getAttribute('style') ?? '';
    const cleaned = style
      .replace(/font-weight\s*:\s*[^;]+;?\s*/gi, '')
      .replace(/;\s*;/g, ';')
      .trim();

    if (cleaned) node.setAttribute('style', cleaned);
    else node.removeAttribute('style');
  });

  root.querySelectorAll('[class]').forEach((node) => {
    const className = node.getAttribute('class') ?? '';
    const cleaned = className
      .split(/\s+/)
      .filter(
        (cls) =>
          cls &&
          !/^font-(semibold|bold|medium|extrabold|black)$/i.test(cls),
      )
      .join(' ')
      .trim();

    if (cleaned) node.setAttribute('class', cleaned);
    else node.removeAttribute('class');
  });

  let normalized = root.toString();
  normalized = normalized.replace(/(<strong>Materials:)(<br>)+/i, '$1<br>');

  return normalized;
}
