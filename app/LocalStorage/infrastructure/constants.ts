export const BASE_LOCAL_STORAGE_KEY = "rummikub";
export const localStorageKey = (key: string) =>
  `${BASE_LOCAL_STORAGE_KEY}-${key}`;
