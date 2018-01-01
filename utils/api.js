import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'FlashCards';

function setDummyData() {
  let dummyData = {
    '01': {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    '02': {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared',
        },
      ],
    },
  };

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function formatResults(results) {
  return results === null ? setDummyData() : JSON.parse(results);
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(formatResults);
}

export function saveDeck(deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}

export function addCardToDeck({ card, key }) {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = { ...data[key], questions: [...data[key].questions, card] };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}
