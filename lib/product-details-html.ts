import { parse as parseHtml } from 'node-html-parser';

const DETAIL_LABEL_CLASS = 'product-detail-label';

const MATERIALS_HTML_PATTERNS = [
  /(?:<p>\s*)?<strong>\s*Materials?\s*:?\s*(?:<br\s*\/?>)?\s*<\/strong>(?:\s*<\/p>)?/i,
  /<strong>\s*Materials?\s*:?\s*(?:<br\s*\/?>)?\s*<\/strong>/i,
  /(?:<p>\s*)?<b>\s*Materials?\s*:?\s*(?:<br\s*\/?>)?\s*<\/b>(?:\s*<\/p>)?/i,
  /<b>\s*Materials?\s*:?\s*(?:<br\s*\/?>)?\s*<\/b>/i,
  /(?:<p>\s*)?<span[^>]*>\s*Materials?\s*:?\s*<\/span>(?:\s*<\/p>)?/i,
  /<span[^>]*>\s*Materials?\s*:?\s*<\/span>/i,
  /(?:<br\s*\/?>\s*)+\s*Materials?\s*(?=<br\s*\/?>|<\/p>|\s*:)/i,
  /(?:<p[^>]*>\s*)Materials?\s*(?=<br\s*\/?>|<\/p>|\s*:)/i,
  /\bMaterials?\s*:<\/(?:p|span|strong|b)>/i,
  /\bMATERIALS\b/i,
];

function findMaterialsSectionIndex(html: string): number {
  for (const pattern of MATERIALS_HTML_PATTERNS) {
    const match = html.match(pattern);
    if (match?.index != null) {
      return match.index;
    }
  }

  return -1;
}

function findMaterialsPlainTextIndex(text: string): number {
  const lineMatch = text.match(/(?:^|\n\s*)Materials?\s*:?\s*(?:\n|$)/i);
  if (lineMatch?.index != null) {
    return lineMatch.index;
  }

  return text.search(/\bMATERIALS\b/i);
}

function plainTextToHtml(text: string, boldSectionHeaders = false): string {
  if (boldSectionHeaders) {
    return plainTextToDetailsHtml(text);
  }

  return text
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block) => `<p>${block.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function plainTextToDetailsHtml(text: string): string {
  const lines = text.trim().split('\n');
  const parts: string[] = [];
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (buffer.length) {
      parts.push(`<p>${buffer.join('<br>')}</p>`);
      buffer = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushBuffer();
      continue;
    }

    if (isSectionHeader(trimmed.replace(/:$/, ''))) {
      flushBuffer();
      parts.push(
        `<p><strong class="${DETAIL_LABEL_CLASS}">${trimmed.replace(/:$/, '')}</strong></p>`,
      );
      continue;
    }

    buffer.push(trimmed);
  }

  flushBuffer();
  return parts.join('');
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

    result = result.replace(
      new RegExp(`(<p[^>]*>\\s*)${label}(\\s*:)?(?=[A-Za-z0-9])`, 'gi'),
      (match, prefix) =>
        match.includes('product-detail-label') ? match : `${prefix}${wrapped}<br>`,
    );

    result = result.replace(
      new RegExp(`(<br\\s*\\/?>\\s*)${label}(\\s*:)?(?=[A-Za-z0-9])`, 'gi'),
      (match, prefix) =>
        match.includes('product-detail-label') ? match : `${prefix}${wrapped}<br>`,
    );
  }

  return result;
}

function cleanupSectionHeaderMarkup(html: string): string {
  let result = html;

  result = result.replace(
    new RegExp(
      `<strong class="${DETAIL_LABEL_CLASS}">\\s*<strong class="${DETAIL_LABEL_CLASS}">(MATERIALS|DIMENSIONS)<\\/strong>\\s*<\\/strong>`,
      'gi',
    ),
    `<strong class="${DETAIL_LABEL_CLASS}">$1</strong>`,
  );

  result = result.replace(
    /<strong[^>]*>\s*<br\s*\/?>\s*<\/strong>/gi,
    '',
  );

  result = result.replace(
    new RegExp(
      `(<strong class="${DETAIL_LABEL_CLASS}">(?:MATERIALS|DIMENSIONS)<\\/strong>)\\s*(?:<br\\s*\\/?>\\s*){2,}`,
      'gi',
    ),
    '$1<br>',
  );

  return result;
}

function finalizeSectionHeaders(html: string): string {
  let result = html;

  for (const label of ['MATERIALS', 'DIMENSIONS'] as const) {
    const wrapped = `<strong class="${DETAIL_LABEL_CLASS}">${label}</strong>`;

    result = result.replace(
      new RegExp(`(?<!<strong class="${DETAIL_LABEL_CLASS}">)${label}(?!\\s*<\\/strong>)`, 'gi'),
      (match, offset, source) => {
        const before = source.slice(Math.max(0, offset - 50), offset);
        if (before.includes('product-detail-label')) {
          return match;
        }
        return wrapped;
      },
    );
  }

  result = result.replace(
    new RegExp(
      `(<strong class="${DETAIL_LABEL_CLASS}">(?:MATERIALS|DIMENSIONS)<\\/strong>)([A-Za-z0-9])`,
      'gi',
    ),
    '$1<br>$2',
  );

  result = result.replace(
    /\b(MATERIALS|DIMENSIONS)([A-Za-z0-9])/gi,
    `<strong class="${DETAIL_LABEL_CLASS}">$1</strong><br>$2`,
  );

  return cleanupSectionHeaderMarkup(result);
}

export function splitProductDescription(
  descriptionHtml: string,
  plainDescription: string,
): { descriptionHtml: string; detailsHtml: string } {
  const htmlIndex = descriptionHtml ? findMaterialsSectionIndex(descriptionHtml) : -1;

  if (htmlIndex >= 0) {
    return {
      descriptionHtml: normalizeProductDescriptionHtml(descriptionHtml.slice(0, htmlIndex)),
      detailsHtml: normalizeProductDetailsHtml(descriptionHtml.slice(htmlIndex)),
    };
  }

  const plainIndex = plainDescription ? findMaterialsPlainTextIndex(plainDescription) : -1;

  if (plainIndex >= 0) {
    return {
      descriptionHtml: extractProductDescriptionPlain(plainDescription),
      detailsHtml: extractProductFeaturesPlain(plainDescription),
    };
  }

  if (descriptionHtml) {
    return {
      descriptionHtml: normalizeProductDescriptionHtml(descriptionHtml),
      detailsHtml: '',
    };
  }

  return {
    descriptionHtml: plainTextToHtml(plainDescription),
    detailsHtml: '',
  };
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
    if (!isSectionHeader(node.text)) {
      return;
    }

    const nestedHeader = node.querySelector('strong, b');
    if (nestedHeader && isSectionHeader(nestedHeader.text)) {
      node.replaceWith(
        parseHtml(
          `<strong class="${DETAIL_LABEL_CLASS}">${nestedHeader.text.trim()}</strong>`,
        ).firstChild ?? node,
      );
      return;
    }

    node.setAttribute('class', DETAIL_LABEL_CLASS);
  });

  root.querySelectorAll('span').forEach((node) => {
    if (isSectionHeader(node.text)) {
      node.replaceWith(
        parseHtml(`<strong class="${DETAIL_LABEL_CLASS}">${node.text.trim()}</strong>`),
      );
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
  normalized = wrapDetailSectionLabels(normalized);
  normalized = finalizeSectionHeaders(normalized);

  return normalized;
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
