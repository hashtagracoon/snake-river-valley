export const setWordCache = (wordCache) => {
  return {
    type: "SET_WORD_CACHE",
    wordCache
  };
};

export const setDbInstance = (dbInstance) => {
  return {
    type: "SET_DB_INSTANCE",
    dbInstance
  };
};
