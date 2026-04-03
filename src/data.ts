import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'airport',
    title: 'Airport Arrival',
    urgencyRank: 1,
    phraseCount: 6,
    exchanges: [
      {
        id: 'a1',
        npcGreek: 'Πού είναι η έξοδος για ταξί;',
        npcPhonetic: 'Poo EE-neh ee EX-oh-thos ya tak-SEE?',
        npcEnglish: 'Where is the taxi exit?',
        options: [
          {
            id: 'a1o1',
            greek: 'Ευθεία και δεξιά.',
            phonetic: 'ef-thee-A ke thek-sy-A',
            english: 'Straight and right.',
            isCorrect: true,
            hint: 'Short directional response used constantly in airports.'
          },
          {
            id: 'a1o2',
            greek: 'Θα ήθελα έναν καφέ.',
            phonetic: 'tha EE-thela EN-an ka-FE',
            english: "I'd like a coffee.",
            isCorrect: false,
            hint: 'Useful phrase, but wrong situation.'
          },
          {
            id: 'a1o3',
            greek: 'Έχω κράτηση.',
            phonetic: 'E-ho KRA-tee-see',
            english: 'I have a reservation.',
            isCorrect: false,
            hint: 'Useful at hotels, not for this question.'
          }
        ]
      }
    ]
  },
  {
    id: 'taxi',
    title: 'Taxi Ride',
    urgencyRank: 2,
    phraseCount: 7,
    exchanges: [
      {
        id: 't1',
        npcGreek: 'Πού θέλετε να πάμε;',
        npcPhonetic: 'Poo THE-leh-te na PA-me?',
        npcEnglish: 'Where do you want to go?',
        options: [
          {
            id: 't1o1',
            greek: 'Στο ξενοδοχείο μου, παρακαλώ.',
            phonetic: 'sto kseh-no-tho-HEE-o moo, pa-ra-ka-LO',
            english: 'To my hotel, please.',
            isCorrect: true,
            hint: 'Functional travel phrase for immediate use.'
          },
          {
            id: 't1o2',
            greek: 'Ο λογαριασμός, παρακαλώ.',
            phonetic: 'o lo-ga-ria-SMOS pa-ra-ka-LO',
            english: 'The bill, please.',
            isCorrect: false,
            hint: 'Restaurant phrase.'
          },
          {
            id: 't1o3',
            greek: 'Θα έρθω αύριο.',
            phonetic: 'tha ER-tho AV-rio',
            english: 'I will come tomorrow.',
            isCorrect: false,
            hint: 'Grammatically valid, context mismatch.'
          }
        ]
      }
    ]
  },
  {
    id: 'hotel',
    title: 'Hotel Check-in',
    urgencyRank: 3,
    phraseCount: 8,
    exchanges: [
      {
        id: 'h1',
        npcGreek: 'Έχετε κράτηση;',
        npcPhonetic: 'E-he-te KRA-tee-see?',
        npcEnglish: 'Do you have a reservation?',
        options: [
          {
            id: 'h1o1',
            greek: 'Ναι, στο όνομα David.',
            phonetic: 'neh, sto O-no-ma DEI-vid',
            english: 'Yes, under the name David.',
            isCorrect: true,
            hint: 'High-frequency hotel phrase.'
          },
          {
            id: 'h1o2',
            greek: 'Πόσο κάνει;',
            phonetic: 'PO-so KA-ni?',
            english: 'How much is it?',
            isCorrect: false,
            hint: 'Not wrong Greek, wrong turn in this exchange.'
          },
          {
            id: 'h1o3',
            greek: 'Χρειάζομαι γιατρό.',
            phonetic: 'hree-A-zo-mee ya-TRO',
            english: 'I need a doctor.',
            isCorrect: false,
            hint: 'Emergency phrase; always useful to know.'
          }
        ]
      }
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant Order',
    urgencyRank: 4,
    phraseCount: 10,
    exchanges: [
      {
        id: 'r1',
        npcGreek: 'Τι θα θέλατε να παραγγείλετε;',
        npcPhonetic: 'tee tha THE-la-te na pa-rang-GHEE-le-te?',
        npcEnglish: 'What would you like to order?',
        options: [
          {
            id: 'r1o1',
            greek: 'Θα ήθελα μία μπριζόλα.',
            phonetic: 'tha EE-thela MEE-a bree-ZO-la',
            english: "I'd like a steak.",
            isCorrect: true,
            hint: 'Pattern: Θα ήθελα = polite request framing.'
          },
          {
            id: 'r1o2',
            greek: 'Πού είναι η στάση λεωφορείου;',
            phonetic: 'poo EE-ne ee STA-see le-o-fo-REE-oo?',
            english: 'Where is the bus stop?',
            isCorrect: false,
            hint: 'Transport phrase; useful but not here.'
          },
          {
            id: 'r1o3',
            greek: 'Μιλάτε αγγλικά;',
            phonetic: 'mee-LA-te ang-glee-KA?',
            english: 'Do you speak English?',
            isCorrect: false,
            hint: 'Fallback phrase if stuck.'
          }
        ]
      }
    ]
  },
  {
    id: 'emergency',
    title: 'Emergency',
    urgencyRank: 0,
    phraseCount: 5,
    exchanges: [
      {
        id: 'e1',
        npcGreek: 'Τι συμβαίνει;',
        npcPhonetic: 'tee sim-VE-nee?',
        npcEnglish: 'What is happening?',
        options: [
          {
            id: 'e1o1',
            greek: 'Χρειάζομαι γιατρό τώρα.',
            phonetic: 'hree-A-zo-mee ya-TRO TO-ra',
            english: 'I need a doctor now.',
            isCorrect: true,
            hint: 'Critical emergency sentence, always unlocked.'
          },
          {
            id: 'e1o2',
            greek: 'Το φαγητό ήταν υπέροχο.',
            phonetic: 'to fa-yee-TO EE-tan oo-PE-ro-ho',
            english: 'The food was wonderful.',
            isCorrect: false,
            hint: 'Positive phrase, not emergency-appropriate.'
          },
          {
            id: 'e1o3',
            greek: 'Θα πάω στην παραλία.',
            phonetic: 'tha PA-o stin pa-ra-LEE-a',
            english: 'I will go to the beach.',
            isCorrect: false,
            hint: 'Unrelated leisure sentence.'
          }
        ]
      }
    ]
  }
];
