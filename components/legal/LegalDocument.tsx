import { Fragment, ReactNode } from 'react';

import { LegalPolicy } from './types';

const linkPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

function linkedText(text: string): ReactNode[] {
  return text.split(linkPattern).map((part, index) => {
    if (!part) return null;

    if (part.includes('@') && !part.startsWith('http')) {
      return (
        <a key={`${part}-${index}`} href={`mailto:${part}`} className="font-semibold text-black underline underline-offset-2">
          {part}
        </a>
      );
    }

    if (part.startsWith('http') || part.startsWith('www.')) {
      const trailingPunctuation = part.match(/[.,;:)\]]+$/)?.[0] ?? '';
      const linkText = trailingPunctuation ? part.slice(0, -trailingPunctuation.length) : part;
      const href = linkText.startsWith('www.') ? `https://${linkText}` : linkText;
      return (
        <Fragment key={`${part}-${index}`}>
          <a href={href} className="font-semibold text-black underline underline-offset-2">
            {linkText}
          </a>
          {trailingPunctuation}
        </Fragment>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

export default function LegalDocument({ policy }: { policy: LegalPolicy }) {
  return (
    <article className="max-w-[1120px] text-[#111111]">
      <h1 className="text-[12px] font-bold uppercase leading-[1.35] tracking-[0.01em] sm:text-[13px]">
        {policy.title}
      </h1>
      {policy.effectiveDate && (
        <p className="mt-5 text-[11px] italic leading-[1.45] sm:text-[12px]">{policy.effectiveDate}</p>
      )}

      <div className="mt-5 space-y-3 text-[11px] leading-[1.48] sm:text-[12px]">
        {policy.blocks.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={`${block.text}-${index}`}
                className="pt-2 text-[11px] font-bold uppercase leading-[1.4] tracking-[0.01em] sm:text-[12px]"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === 'table') {
            return (
              <div key={`table-${index}`} className="my-5 overflow-x-auto border border-neutral-300">
                <table className="w-full min-w-[620px] border-collapse text-left text-[10px] leading-[1.4] sm:text-[11px]">
                  <thead>
                    <tr className="bg-neutral-100">
                      {block.headers.map((header) => (
                        <th key={header} className="border-b border-r border-neutral-300 px-3 py-2 font-bold uppercase last:border-r-0">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`row-${rowIndex}`} className="border-b border-neutral-300 last:border-b-0">
                        {row.map((cell, cellIndex) => (
                          <td key={`cell-${cellIndex}`} className="border-r border-neutral-300 px-3 py-2 align-top last:border-r-0">
                            {linkedText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          const isBullet = block.text.startsWith('-');
          return (
            <p key={`${block.text.slice(0, 40)}-${index}`} className={isBullet ? 'pl-4 before:-ml-3 before:mr-2 before:content-["•"]' : ''}>
              {linkedText(isBullet ? block.text.replace(/^-\s*/, '') : block.text)}
            </p>
          );
        })}
      </div>
    </article>
  );
}
