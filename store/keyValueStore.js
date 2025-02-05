export default class KeyValueStore {
    constructor() {
      this.store = {};
      this.ttlTimers = {};
    }
  
    set(key, value, ttl) {
      this.store[key] = value;
  
      if (this.ttlTimers[key]) {
        clearTimeout(this.ttlTimers[key]);
      }
  
      if (ttl) {
        this.ttlTimers[key] = setTimeout(() => {
          delete this.store[key];
          delete this.ttlTimers[key];
        }, ttl * 1000);
      }
    }
  
    get(key) {
      return this.store[key] || null;
    }
  
    delete(key) {
      if (this.store[key]) {
        delete this.store[key];
        clearTimeout(this.ttlTimers[key]);
        delete this.ttlTimers[key];
        return true;
      }
      return false;
    }
  
    getAllKeys() {
      return this.store;
    }
  }
  