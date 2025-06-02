import React, { useState } from 'react';

const ReadMoreParagraph = ({ text, bold, italic }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;
  const isLong = text.length > limit;

  const visibleText = expanded ? text : text.slice(0, limit) + (isLong ? '...' : '');

  return (
    <div className="text-xs text-gray-700 leading-relaxed">
      <span
        style={{
          fontWeight: bold ? 700 : 400,
          fontStyle: italic ? 'italic' : 'normal',
        }}
      >
        {visibleText}
      </span>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 font-poppins font-medium mt-3 text-sm text-black hover:underline"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md">{question}</span>
        <span className="ml-4 transform transition-transform duration-300">
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <ReadMoreParagraph text={answer} bold={false} italic={false} />
        </div>
      )}
    </div>
  );
};

const ArticleRenderer = ({ content }) => {
  return (
    <div className="max-w-10xl mx-auto px-4 py-6 text-gray-800">
      {content.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case 'heading':
            const HeadingTag = `h${block.level}`;
            const headingSize = {
              1: 'text-md font-bold',
              2: 'text-xs font-semibold',
              3: 'text-sm font-semibold',
              4: 'text-xs font-medium',
              5: 'text-xs font-medium',
              6: 'text-xs font-medium',
            }[block.level] || 'text-xl font-medium';

            return (
              <div key={key} className="elementor-element elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <HeadingTag className={`elementor-heading-title ${headingSize}`}>
                    {block.text}
                  </HeadingTag>
                </div>
              </div>
            );

          case 'paragraph':
            return (
              <div key={key} className="elementor-element elementor-widget elementor-widget-text-editor">
                <div className="elementor-widget-container space-y-2">
                  {block.content.map((el, i) => {
                    if (el.type === 'p') {
                      return (
                        <ReadMoreParagraph
                          key={`p-${i}`}
                          text={el.text}
                          bold={el.bold}
                          italic={el.italic}
                        />
                      );
                    } else if (el.type === 'h3') {
                      return (
                        <h3 key={`h3-${i}`} className="text-md font-semibold text-gray-800">
                          <span style={{ fontWeight: el.bold ? 700 : 400 }}>{el.text}</span>
                        </h3>
                      );
                    } else if (el.type === 'h4') {
                      return (
                        <h4 key={`h4-${i}`} className="text-sm font-medium text-gray-800">
                          <span style={{ fontWeight: el.bold ? 700 : 400 }}>{el.text}</span>
                        </h4>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            );
            
          case 'faq':
            return (
              <div key={key} className="elementor-element elementor-widget">
                <div className="elementor-widget-container">
                  <div className="bg-white rounded-lg shadow-sm transform transition-transform duration-300">
                    {block.items.map((item, idx) => (
                      <FAQItem 
                        key={`faq-${idx}`} 
                        question={item.question} 
                        answer={item.answer} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ArticleRenderer;