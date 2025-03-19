import cach from "../model/cachModel.js";
import KeyValueService from "../store/keyValueService.js";
const DEFAULT_TTL =   60 * 60; 

export const setKey = async(req,res)=>{
    const { uid, key, value, ttl } = req.body;
    console.log("seeting of caching called",key);
    if (!uid || !key || value === undefined) {
        return res.status(400).json({ message: 'UID, key, and value are required' });
    }

    // Calculate the expiration time by adding the TTL to the current time
    const userTTL = ttl ? ttl : DEFAULT_TTL; // Use user-provided TTL or default TTL
    const expirationTime = new Date(Date.now() + userTTL); // TTL as a Date object

    // Store in-memory (assuming you have an in-memory service for caching)
    const service = req.app.locals.service;
    const userStore = service.getUserStore(uid);
    userStore.set(key, value, userTTL);

    // Store in database (with TTL)
    try {
        await cach.updateOne(
            { uid, key },
            { $set: { value, ttl: expirationTime  } },
            { upsert: true }
        );
    } catch (error) {
        return res.status(500).json({ message: 'Error saving to database', error });
    }

    res.json({ message: `Stored: ${key} => ${value} for user: ${uid}, TTL: ${userTTL || 'None'}` });
};
    


export const getKey = async (req, res) => {
    const { uid, key } = req.params;

    // First, check in memory
    const service = req.app.locals.service;
    const userStore = service.getUserStore(uid);
    let value = userStore.get(key);

    if (value === null) {
        // Check the database if not found in memory
        try {
            const userData = await cach.findOne({ uid, key });
            if (userData) {
                // Check if TTL expired
                if (userData.ttl < Date.now()) {
                    // TTL cach, remove the key
                    await cach.deleteOne({ uid, key });
                    return res.status(404).json({ message: 'Key expired' });
                }
                value = userData.value;
                userStore.set(key, value, userData.ttl);
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving from database', error });
        }
    }

    if (value === null) {
        return res.status(404).json({ message: 'Key not found' });
    }

    res.json({ key, value });
};
