export type SearchDirection = 'tr-to-ar' | 'ar-to-tr';

export type EconomicCategory =
  | 'Makroekonomi'
  | 'Para ve Bankacılık'
  | 'Maliye ve Vergi'
  | 'Uluslararası Ticaret'
  | 'Borsa ve Finansal Piyasalar'
  | 'İslam İktisadı ve Katılım Finansı'
  | 'Şirketler ve Girişimcilik'
  | 'Dijital Varlıklar ve Kripto';

export interface EconomicTerm {
  id: string;
  turkish: string;
  arabic: string;
  turkishPhonetic?: string;
  arabicPhonetic?: string;
  category: EconomicCategory;
  categoryAr: string;
  turkishDefinition: string;
  arabicDefinition: string;
  turkishExample: string;
  arabicExample: string;
  relatedTerms?: string[];
  isFeaturedMonth?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
}

export interface EconomicAbbreviation {
  code: string;
  turkishFull: string;
  arabicFull: string;
  descriptionTr: string;
  descriptionAr: string;
  category: string;
}
