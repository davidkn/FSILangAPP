export type SituationId =
  | 'airport'
  | 'taxi'
  | 'hotel'
  | 'restaurant'
  | 'emergency';

export type Proficiency = 'first_timer' | 'some_exposure' | 'comfortable';

export type LearnerProfile = {
  tripType: 'holiday' | 'business' | 'mixed';
  arrivalMode: 'arriving_soon' | 'already_in_greece';
  proficiency: Proficiency;
};

export type ExchangeOption = {
  id: string;
  greek: string;
  phonetic: string;
  english: string;
  isCorrect: boolean;
  hint: string;
};

export type Exchange = {
  id: string;
  npcGreek: string;
  npcPhonetic: string;
  npcEnglish: string;
  options: ExchangeOption[];
};

export type Scenario = {
  id: SituationId;
  title: string;
  urgencyRank: number;
  phraseCount: number;
  exchanges: Exchange[];
};

export type DebriefStats = {
  phrasesUsed: number;
  firstTry: number;
  hintsUsed: number;
  focusPhrase?: string;
};
