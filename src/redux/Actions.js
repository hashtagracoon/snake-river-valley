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

export const setAppStatus = (appStatus) => {
  return {
    type: "SET_APP_STATUS",
    appStatus
  };
};
