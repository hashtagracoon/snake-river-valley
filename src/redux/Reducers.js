import { combineReducers } from 'redux';
import Deque from 'double-ended-queue';

const dequeCapacity = 17; // 8 | 1 | 8

const wordCacheInitialState = {
  mostCommonCache: new Deque(dequeCapacity),
  ieltsCache: new Deque(dequeCapacity),
  toeflCache: new Deque(dequeCapacity),
  greCache: new Deque(dequeCapacity),
  satCache: new Deque(dequeCapacity)
};

const handleWordCacheType = (wordCache, state) => {
  switch(wordCache.type) {
    case "mostCommon":
      handleWordCacheOperation(wordCache, state.mostCommonCache);
      break;
    case "ielts":
      handleWordCacheOperation(wordCache, state.ieltsCache);
      break;
    case "toefl":
      handleWordCacheOperation(wordCache, state.toeflCache);
      break;
    case "gre":
      handleWordCacheOperation(wordCache, state.greCache);
      break;
    case "sat":
      handleWordCacheOperation(wordCache, state.satCache);
      break;
    default: break;
  }
  return state;
};

const handleWordCacheOperation = (wordCache, deque) => {
  switch(wordCache.operation) {
    case "PUSH":
      deque.push(wordCache.content);
      break;
    case "UNSHIFT":
      deque.unshift(wordCache.content);
      break;
    default: break;
  }
};

const dbInitialState = {
  dbInstance: null
};

const wordCacheReducer = (state = wordCacheInitialState, action) => {
  switch(action.type) {
    case "SET_WORD_CACHE":
      return handleWordCacheType(
        action.wordCache,
        { ...state }
      );
    default:
      return state;
  }
};

const dbReducer = (state = dbInitialState, action) => {
  switch(action.type) {
    case "SET_DB_INSTANCE":
      return { ...state, dbInstance: action.dbInstance };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  wordCacheState: wordCacheReducer,
  dbState: dbReducer
});
