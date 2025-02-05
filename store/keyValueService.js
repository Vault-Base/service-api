import cach from "../model/cachModel.js";
import KeyValueStore from "./keyValueStore.js";

export default class KeyValueService {
  constructor() {
    this.userStores = {};
  }
  async loadMemory() {
    try {
        
        const data = await cach.find({});
        data.forEach(item => {
           
            if (!this.userStores[item.uid]) {
                this.userStores[item.uid] = new KeyValueStore();
            }
            
            this.userStores[item.uid].set(item.key, item.value, item.ttl);
        });
        console.log("In-memory data loaded successfully.");
    } catch (error) {
        console.error("Error loading data into memory:", error);
    }
}

  getUserStore(uid) {
    if (!this.userStores[uid]) {
      this.userStores[uid] = new KeyValueStore();
    }
    return this.userStores[uid];
  }

  cleanupInactiveUsers() {
    
  }
}
