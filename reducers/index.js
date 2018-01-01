import * as types from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_DECKS:
      return {
        ...action.payload,
      };
    case types.ADD_DECK:
      return {
        ...state,
        ...action.payload,
      };
    case types.ADD_QUESTION: {
      const selDeck = state[action.payload.key];
      return {
        ...state,
        [action.payload.key]: {
          ...selDeck,
          questions: [
            ...selDeck.questions,
            { question: action.payload.question, answer: action.payload.answer },
          ],
        },
      };
    }
    default:
      return state;
  }
}
