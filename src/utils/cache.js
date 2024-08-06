// utils/cache.js

const Redis = require('ioredis');
const redis = new Redis(); // Connects to 127.0.0.1:6379 by default

/**
 * Set data in cache.
 * @param {String} key - The key under which the data is stored.
 * @param {Object} value - The data to store.
 * @param {Number} ttl - Time to live in seconds.
 */
const set = async (key, value, ttl) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
};

/**
 * Get data from cache.
 * @param {String} key - The key under which the data is stored.
 * @return {Object|null} - The retrieved data or null if not found.
 */
const get = async (key) => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

module.exports = { set, get };
