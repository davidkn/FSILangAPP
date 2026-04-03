import { SCENARIOS } from './data';
import { DebriefStats, LearnerProfile, Scenario, SituationId } from './types';

export function prioritizeScenarios(profile: LearnerProfile): Scenario[] {
  const nonEmergency = SCENARIOS.filter((s) => s.id !== 'emergency').sort(
    (a, b) => a.urgencyRank - b.urgencyRank
  );

  if (profile.tripType === 'holiday') {
    nonEmergency.sort((a, b) => {
      const holidayBoost: Record<SituationId, number> = {
        emergency: 0,
        airport: 1,
        taxi: 2,
        hotel: 3,
        restaurant: 0
      };
      return a.urgencyRank + holidayBoost[a.id] - (b.urgencyRank + holidayBoost[b.id]);
    });
  }

  if (profile.arrivalMode === 'already_in_greece') {
    nonEmergency.sort((a, b) => {
      if (a.id === 'airport') {
        return 1;
      }
      if (b.id === 'airport') {
        return -1;
      }
      return a.urgencyRank - b.urgencyRank;
    });
  }

  return [SCENARIOS.find((s) => s.id === 'emergency')!, ...nonEmergency];
}

export function getDebriefStats(correctOnFirstTry: boolean, phrase: string): DebriefStats {
  if (correctOnFirstTry) {
    return {
      phrasesUsed: 1,
      firstTry: 1,
      hintsUsed: 0
    };
  }

  return {
    phrasesUsed: 1,
    firstTry: 0,
    hintsUsed: 1,
    focusPhrase: phrase
  };
}

export function getPlaybackRate(proficiency: LearnerProfile['proficiency']): number {
  if (proficiency === 'first_timer') {
    return 0.7;
  }
  if (proficiency === 'some_exposure') {
    return 0.85;
  }
  return 1;
}
