# Travel Greek Coach (FSI-style) – Mobile MVP

This repository contains a practical **Expo React Native MVP** for first-time visitors to Greece.

It implements the flow from your discussion:
- low-anxiety onboarding
- scenario-by-situation hub (restaurant, taxi, hotel, etc.)
- guided response selection
- hear-it-first + say-it-aloud practice
- scene debrief focused on usable travel outcomes

## Product principles baked into the app

1. **Situation-first, not grammar-first**
2. **Hear before speak** (FSI sequencing)
3. **No shame feedback** (errors = input)
4. **Progress = situations handled**

## Quick start

```bash
npm install
npm run start
```

Then open in Expo Go / simulator.

## Current MVP scope

- Local data only (no backend)
- Mock speech scoring (replace with API later)
- Deterministic scenario engine suitable for v1 validation

## Suggested next integrations

- TTS: on-device first, cloud fallback
- ASR/pronunciation: Azure Pronunciation Assessment or Speechace
- Analytics: scene completion, retries, skip behavior
