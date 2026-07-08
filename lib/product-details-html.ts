import { parse as parseHtml } from 'node-html-parser';

const DETAIL_LABEL_CLASS = 'product-detail-label';

const MATERIALS_SECTION_REGEX =
  /(?:<p>\s*)?<strong>\s*Materials?\s*:?\s*(?:<br\s*\/?>)?\s*<\/strong>(?:\s*<\/p>)?|<strong>\s*Materials?\s*:?\s*(?:<br\s*\/?>)?\s*<\/strong>/i;

function findMaterialsSectionIndex(html: string): number {
  const match = html.match(MATERIALS_SECTION_REGEX);
  return match?.index ?? -1;
}

function findMaterialsPlainTextIndex(text: string): number {
  return text.search(/\bMATERIALS\b/i);
}

function plainTextToHtml(text: string, boldSectionHeaders = false): string {
  return text
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block) => {
      const trimmed = block.trim();
      if (boldSectionHeaders && isSectionHeader(trimmed.replace(/:$/, ''))) {
        return `<p><strong class="${DETAIL_LABEL_CLASS}">${trimmed}</strong></p>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

function stripMetaTags(root: ReturnType<typeof parseHtml>) {
  root.querySelectorAll('meta').forEach((node) => node.remove());
}

function isSectionHeader(text: string): boolean {
  const normalized = text.trim().replace(/:$/, '');
  return /^materials?$/i.test(normalized) || /^dimensions?$/i.test(normalized);
}

function wrapStandaloneHeaderLines(html: string): string {
  let result = html;

  for (const label of ['MATERIALS', 'DIMENSIONS'] as const) {
    const wrapped = `<strong class="${DETAIL_LABEL_CLASS}">${label}</strong>`;
    if (result.includes(wrapped)) {
      // Still process in case only one occurrence is wrapped.
    }

    result = result.replace(
      new RegExp(`(<br\\s*\\/?>\\s*)${label}(\\s*(?=<br\\s*\\/?>|<\\/p|$))`, 'gi'),
      (match, prefix, suffix) =>
        match.includes('product-detail-label') ? match : `${prefix}${wrapped}${suffix}`,
    );

    result = result.replace(
      new RegExp(`(<p[^>]*>\\s*)${label}(\\s*(?=<br\\s*\\/?>|<\\/p|$))`, 'gi'),
      (match, prefix, suffix) =>
        match.includes('product-detail-label') ? match : `${prefix}${wrapped}${suffix}`,
    );
  }

  return result;
}

export function extractProductDescriptionHtml(htmlString: string): string {
  if (!htmlString) return '';

  const index = findMaterialsSectionIndex(htmlString);
  const introHtml = index >= 0 ? htmlString.slice(0, index) : htmlString;

  return normalizeProductDescriptionHtml(introHtml);
}

export function extractProductDescriptionPlain(text: string): string {
  if (!text) return '';

  const index = findMaterialsPlainTextIndex(text);
  const intro = (index >= 0 ? text.slice(0, index) : text).trim();

  return plainTextToHtml(intro);
}

export function extractProductFeaturesHtml(htmlString: string): string {
  if (!htmlString) return '';

  const index = findMaterialsSectionIndex(htmlString);
  if (index < 0) return '';

  return normalizeProductDetailsHtml(htmlString.slice(index));
}

export function extractProductFeaturesPlain(text: string): string {
  if (!text) return '';

  const index = findMaterialsPlainTextIndex(text);
  if (index < 0) return '';

  return normalizeProductDetailsHtml(plainTextToHtml(text.slice(index).trim(), true));
}

export function normalizeProductDescriptionHtml(html: string): string {
  if (!html.trim()) return '';

  const root = parseHtml(html, { comment: false });
  stripMetaTags(root);

  return root.toString().trim();
}

export function normalizeProductDetailsHtml(html: string): string {
  let root = parseHtml(html, { comment: false });

  stripMetaTags(root);

  root.querySelectorAll('strong, b').forEach((node) => {
    if (isSectionHeader(node.text)) {
      node.setAttribute('class', DETAIL_LABEL_CLASS);
    }
  });

  root.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((node) => {
    const paragraph = parseHtml(`<p>${node.innerHTML}</p>`);
    node.replaceWith(paragraph.firstChild ?? paragraph);
  });

  root.querySelectorAll('p').forEach((node) => {
    const text = node.text.trim().replace(/:$/, '');
    if (isSectionHeader(text)) {
      node.innerHTML = `<strong class="${DETAIL_LABEL_CLASS}">${node.text.trim()}</strong>`;
    }
  });

  let normalized = root.toString();
  normalized = normalized.replace(/(<strong>Materials:)(<br>)+/i, '$1<br>');
  normalized = wrapStandaloneHeaderLines(normalized);

  return wrapDetailSectionLabels(normalized);
}

function wrapDetailSectionLabels(html: string): string {
  let result = html;

  if (!/<strong class="product-detail-label">\s*Materials?\s*:?\s*<\/strong>/i.test(result)) {
    result = result.replace(/Materials:/gi, `<strong class="${DETAIL_LABEL_CLASS}">Materials:</strong>`);
  }

  if (!/<strong class="product-detail-label">\s*Dimensions?\s*:?\s*<\/strong>/i.test(result)) {
    result = result.replace(/Dimensions:/gi, `<strong class="${DETAIL_LABEL_CLASS}">Dimensions:</strong>`);
  }

  return result;
}
