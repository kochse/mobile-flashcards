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
    default:
      return state;
  }
}