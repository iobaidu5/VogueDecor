export type LegalTableBlock = {
  type: 'table';
  headers: string[];
  rows: string[][];
};

export type LegalTextBlock = {
  type: 'heading' | 'paragraph';
  text: string;
};

export type LegalPolicy = {
  title: string;
  effectiveDate: string;
  blocks: Array<LegalTableBlock | LegalTextBlock>;
};

export type LegalPolicyKey = 'terms' | 'privacy' | 'shipping' | 'returns';

export type LegalPolicySet = Record<LegalPolicyKey, LegalPolicy>;
