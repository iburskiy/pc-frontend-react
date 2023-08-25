import { ReduxStore } from '../types';
import { Action } from 'redux';

const initialState: ReduxStore = {
  isLoggedIn: false,
};

export const Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, isLoggedIn: true}
    case "LOGOUT":
      return {...state, isLoggedIn: false}
    default: return state;
  }
}