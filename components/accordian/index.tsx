'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
// @ import media
import Down from 'media/svg/arrow-down.svg';
import Up from 'media/svg/arrow-up.svg';

interface AccordionProps {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const toggleAccordion = (): void => {
    setIsOpen((prev) => !prev);
  };

  // recursive render function to catch all <strong> nodes
  const renderContent = (nodes: ReactNode): ReactNode => {
    if (Array.isArray(nodes)) {
      return nodes.map((node, idx) => renderContentWithKey(node, idx));
    }
    return renderContentWithKey(nodes);
  };

  const renderContentWithKey = (node: ReactNode, key?: string | number): ReactNode => {
    if (React.isValidElement(node)) {
      if (node.type === 'strong') {
        return React.cloneElement(node, {
          key: node.key || key,
          className: 'text-black font-semibold',
          children: renderContent(node.props.children),
        });
      }
      return React.cloneElement(node, {
        key: node.key || key,
        children: renderContent(node.props.children),
      });
    }
    return node;
  };

  const contentColorClass =
    content === 'In-Stock'
      ? 'text-green-600'
      : content === 'Out of Stock'
      ? 'text-red-600'
      : 'text-[#818181]';

  return (
    <div className="overflow-hidden rounded-lg last:mb-0 xs:mb-2 md:mb-4">
      <button
        className="flex w-full cursor-pointer items-center justify-between border-none bg-white py-1.5"
        onClick={toggleAccordion}
      >
        <h5 className="font-poppins xs:text-[13px] md:text-[13px] font-small capitalize text-black">
          {title}
        </h5>
        <Image src={isOpen ? Up : Down} alt="icons" width={20} height={20} />
      </button>
      <motion.div
        className="overflow-hidden bg-white"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`py-3 ${contentColorClass} font-poppins xs:text-[13px] md:text-[13px]`}
        >
          {renderContent(content)}
        </div>
      </motion.div>
    </div>
  );
};

export default Accordion;
