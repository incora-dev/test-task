import { action } from '../../utils/serializer';

import {
  GET_USERS,
  SET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from '../actionTypes';

export const getUsers = ()  => action(GET_USERS);
export const setUsers = (data)  => action(SET_USERS, data);
export const addUser = (data)  => action(ADD_USER, data);
export const editUser = (data)  => action(EDIT_USER, data);
export const deleteUser = (data)  => action(DELETE_USER, data);