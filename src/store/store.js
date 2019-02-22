import { applyMiddleware, createStore } from 'redux';
import allReducers from './reducers';

const middlewares = [];

export default createStore(allReducers, applyMiddleware(...middlewares));