import {
  GET_USERS,
  SET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from '../actionTypes';

import { users as DATA } from '../../data';

const initialState = {
  users: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: DATA
      }
    case SET_USERS:
      return {
        ...state,
        users: payload
      }
    case ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          {
            ...payload,
            id: state.users.length,
            createdAt: new Date().toISOString()
          }
        ]
      };

    case EDIT_USER:
      const newData = state.users.map((el) => {
        if(el.id === payload.id) {
          return {
            ...el,
            ...payload
          };
        }
        return el;
      })
      return {
        ...state,
        users: newData
      };

    case DELETE_USER:
      const newList = state.users.filter((el) => el.id !== payload);
      return {
        ...state,
        users: newList
      };

    default:
      return state;
  }
}