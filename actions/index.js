import * as types from './types';

export const receiveDecks = decks => ({
  type: types.RECEIVE_DECKS,
  payload: decks,
});

export const addDeck = deck => ({
  type: types.ADD_DECK,
  payload: deck,
});

export const addQuestion = question => ({
  type: types.ADD_QUESTION,
  payload: question,
});
