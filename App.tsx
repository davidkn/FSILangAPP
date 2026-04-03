import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SCENARIOS } from './src/data';
import { getDebriefStats, getPlaybackRate, prioritizeScenarios } from './src/logic';
import { LearnerProfile, Scenario } from './src/types';

type Stage =
  | 'onboarding'
  | 'hub'
  | 'guided_response'
  | 'say_aloud'
  | 'debrief'
  | 'coach_qa';

const QUESTIONS = [
  {
    key: 'tripType' as const,
    title: 'Trip type?',
    options: ['holiday', 'business', 'mixed'] as const
  },
  {
    key: 'arrivalMode' as const,
    title: 'Arrival timing?',
    options: ['arriving_soon', 'already_in_greece'] as const
  },
  {
    key: 'proficiency' as const,
    title: 'Comfort level?',
    options: ['first_timer', 'some_exposure', 'comfortable'] as const
  }
];

export default function App(): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('coach_qa');
  const [profile, setProfile] = useState<LearnerProfile>({
    tripType: 'holiday',
    arrivalMode: 'arriving_soon',
    proficiency: 'first_timer'
  });
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);

  const orderedScenarios = useMemo(() => prioritizeScenarios(profile), [profile]);
  const firstExchange = selectedScenario.exchanges[0];

  if (stage === 'coach_qa') {
    return (
      <Shell title="Build your learning flow">
        <Text style={styles.body}>
          I will ask 3 setup questions so the app starts with the right real-world situations.
        </Text>
        {QUESTIONS.map((q) => (
          <View key={q.key} style={styles.block}>
            <Text style={styles.h3}>{q.title}</Text>
            <View style={styles.rowWrap}>
              {q.options.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.chip,
                    profile[q.key] === option ? styles.chipSelected : undefined
                  ]}
                  onPress={() => setProfile((p) => ({ ...p, [q.key]: option }))}
                >
                  <Text style={styles.chipLabel}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <Button label="Generate onboarding logic" onPress={() => setStage('onboarding')} />
      </Shell>
    );
  }

  if (stage === 'onboarding') {
    return (
      <Shell title="Onboarding logic">
        <Text style={styles.body}>Welcome. You do not need prior language experience.</Text>
        <Text style={styles.body}>Default playback speed: {getPlaybackRate(profile.proficiency)}×</Text>
        <Text style={styles.body}>
          Start queue: {orderedScenarios.slice(0, 3).map((s) => s.title).join(' → ')}
        </Text>
        <Button label="Go to Scenario Hub" onPress={() => setStage('hub')} />
      </Shell>
    );
  }

  if (stage === 'hub') {
    return (
      <Shell title="Scenario Hub (by situation)">
        <Text style={styles.body}>Emergency is always unlocked.</Text>
        <ScrollView>
          {orderedScenarios.map((scenario, index) => (
            <Pressable
              key={scenario.id}
              style={styles.card}
              onPress={() => {
                setSelectedScenario(scenario);
                setStage('guided_response');
              }}
            >
              <Text style={styles.h3}>
                {index + 1}. {scenario.title}
              </Text>
              <Text style={styles.body}>{scenario.phraseCount} phrases</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Shell>
    );
  }

  if (stage === 'guided_response') {
    return (
      <Shell title={selectedScenario.title}>
        <Text style={styles.label}>Hear first</Text>
        <View style={styles.card}>
          <Text style={styles.h3}>{firstExchange.npcGreek}</Text>
          <Text style={styles.body}>{firstExchange.npcPhonetic}</Text>
          <Text style={styles.body}>{firstExchange.npcEnglish}</Text>
        </View>
        {firstExchange.options.map((option) => (
          <Pressable
            key={option.id}
            style={styles.option}
            onPress={() => {
              setAnsweredCorrectly(option.isCorrect);
              setStage('say_aloud');
            }}
          >
            <Text style={styles.h3}>{option.greek}</Text>
            <Text style={styles.body}>{option.phonetic}</Text>
            <Text style={styles.body}>{option.english}</Text>
          </Pressable>
        ))}
      </Shell>
    );
  }

  if (stage === 'say_aloud') {
    const correctPhrase = firstExchange.options.find((o) => o.isCorrect)!;

    return (
      <Shell title="Say it aloud">
        <Text style={styles.h3}>{correctPhrase.greek}</Text>
        <Text style={styles.body}>{correctPhrase.phonetic}</Text>
        <Text style={styles.body}>FSI order: hear first, then speak.</Text>
        <View style={styles.row}>
          <Button label="Hear it first" onPress={() => {}} />
          <Button label="I said it" onPress={() => setStage('debrief')} />
        </View>
        {answeredCorrectly === false && (
          <Text style={styles.warning}>Nudge: stress the ZOH syllable in bree-ZOH-la.</Text>
        )}
      </Shell>
    );
  }

  const correctPhrase = firstExchange.options.find((o) => o.isCorrect)!;
  const stats = getDebriefStats(Boolean(answeredCorrectly), correctPhrase.greek);

  return (
    <Shell title="Scene Debrief">
      <Text style={styles.body}>
        {stats.firstTry ? 'The local would understand you perfectly.' : 'You got through it with hints.'}
      </Text>
      <View style={styles.row}>
        <Stat label="Phrases" value={stats.phrasesUsed} />
        <Stat label="First try" value={stats.firstTry} />
        <Stat label="Hints" value={stats.hintsUsed} />
      </View>
      {stats.focusPhrase && <Text style={styles.warning}>Focus phrase: {stats.focusPhrase}</Text>}
      <View style={styles.row}>
        <Button label="Replay scene" onPress={() => setStage('guided_response')} />
        <Button label="Back to hub" onPress={() => setStage('hub')} />
      </View>
    </Shell>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>{title}</Text>
      <View style={styles.block}>{children}</View>
    </SafeAreaView>
  );
}

function Button({ label, onPress }: { label: string; onPress: () => void }): React.JSX.Element {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

function Stat({ label, value }: { label: string; value: number }): React.JSX.Element {
  return (
    <View style={styles.statCard}>
      <Text style={styles.h3}>{value}</Text>
      <Text style={styles.body}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16
  },
  block: {
    gap: 10
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  h1: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12
  },
  h3: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600'
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  body: {
    color: '#cbd5e1',
    fontSize: 14
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 6
  },
  option: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 4
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  buttonLabel: {
    color: '#eff6ff',
    fontWeight: '600'
  },
  chip: {
    backgroundColor: '#1e293b',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999
  },
  chipSelected: {
    backgroundColor: '#1d4ed8'
  },
  chipLabel: {
    color: '#e2e8f0'
  },
  statCard: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 10,
    minWidth: 90,
    alignItems: 'center'
  },
  warning: {
    color: '#fbbf24'
  }
});
