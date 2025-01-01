import { LOCAL } from './storage-wrapper.js';
import { defaultColorDistribution } from './default-values.js';

/**
 * Exports utility functions to get or set user preferences to storage.
 */

function boolSetterGetter(key, defaultValue) {
  return async (value = undefined) => {
    if (value === undefined) {
      return await LOCAL.get(key, !!defaultValue);
    }
    return await LOCAL.set(key, !!value);
  };
}

function objectSetterGetter(key, defaultValue) {
  return async (value = undefined) => {
    if (value === undefined) {
      return await LOCAL.get(key, defaultValue);
    }
    return await LOCAL.set(key, value);
  };
}

export const enableShuffleUsernames = boolSetterGetter('settings.enableshuffleUsernames', false);
export const ratingDistribution = objectSetterGetter('settings.ratingDistribution', defaultColorDistribution);

export async function getSettings() {
  return {
    enableShuffleUsernames: await enableShuffleUsernames(),
    ratingDistribution: await ratingDistribution(),
  }
}