export class LocalUserProfileCache {
    
    constructor() {
        this.cache = {};
    }

    async get(userId, fetchFunction) {
        const cacheItem = this.cache[userId];
        if (cacheItem?.expires >= Date.now()) {
            return cacheItem.value;
        }

        const serverCopy = await fetchFunction();
        const newCacheItem = {
            value: serverCopy,
            expires: Date.now() + (1000 * 60) * 5
        };

        this.cache[userId] = newCacheItem;
        return newCacheItem.value;
    }
}

export default LocalUserProfileCache;
