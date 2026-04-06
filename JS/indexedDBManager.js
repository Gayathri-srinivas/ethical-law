// ============================================
// INDEXEDDB MANAGER - Multi-Language Support
// ============================================

import { CONFIG } from './config.js';

/**
 * IndexedDB Manager for caching Bible search data
 * Supports both Telugu and English separately
 */
export class IndexedDBManager {
    constructor() {
        this.dbName = 'BibleAppDB';
        this.dbVersion = 2; // ⭐ Changed from 1 to 2 for multi-language
        this.storeName = 'searchData';
        this.db = null;
    }

    /**
     * Initialize IndexedDB
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('❌ IndexedDB failed to open:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ IndexedDB opened successfully');
                resolve(this.db);
            };

            // ⭐⭐⭐ CRITICAL FIX: Use 'language' as keyPath
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Delete old store if exists
                if (db.objectStoreNames.contains(this.storeName)) {
                    db.deleteObjectStore(this.storeName);
                    console.log('🗑️ Deleted old object store');
                }
                
                // Create new store with 'language' as keyPath
                db.createObjectStore(this.storeName, { keyPath: 'language' });
                console.log('✅ IndexedDB object store created (multi-language)');
            };
        });
    }

    /**
     * ⭐ Get search data for specific language
     */
    async getSearchData(language) {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(language); // ⭐ Use language as key

                request.onsuccess = () => {
                    const result = request.result;
                    
                    if (!result) {
                        console.log(`ℹ️ No ${language} data in IndexedDB`);
                        resolve(null);
                        return;
                    }

                    // Check expiry (30 days)
                    const now = Date.now();
                    const age = now - result.timestamp;
                    const maxAge = 30 * 24 * 60 * 60 * 1000;

                    if (age > maxAge) {
                        console.log(`⚠️ Cache expired for ${language}`);
                        resolve(null);
                    } else {
                        console.log(`✅ Search data loaded from IndexedDB`);
                        console.log(`📦 Data size: ${JSON.stringify(result.data).length} bytes`);
                        console.log(`📅 Stored on: ${new Date(result.timestamp).toLocaleString()}`);
                        console.log(`🏷️  Version: ${result.version}`);
                        resolve(result.data);
                    }
                };

                request.onerror = () => {
                    console.error(`❌ Error reading ${language} from IndexedDB:`, request.error);
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(`❌ IndexedDB get error for ${language}:`, error);
            return null;
        }
    }

    /**
     * ⭐⭐⭐ Save search data for specific language
     */
    async saveSearchData(data, language) {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                
                const dataToStore = {
                    language: language,  // ⭐ MUST match keyPath 'language'
                    data: data,
                    timestamp: Date.now(),
                    version: CONFIG.CACHE_VERSION
                };

                const request = store.put(dataToStore);

                request.onsuccess = () => {
                    console.log(`✅ ${language} search data saved to IndexedDB`);
                    console.log(`📦 Saved ${JSON.stringify(data).length} bytes`);
                    console.log(`🏷️  Version: ${CONFIG.CACHE_VERSION}`);
                    resolve(true);
                };

                request.onerror = () => {
                    console.error(`❌ Error saving ${language} to IndexedDB:`, request.error);
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error(`❌ IndexedDB save error for ${language}:`, error);
            return false;
        }
    }

    /**
     * ⭐ Clear all search data (both languages)
     */
    async clearSearchData() {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                
                // Clear both Telugu and English
                store.delete('telugu');
                store.delete('english');

                transaction.oncomplete = () => {
                    console.log('✅ All search data cleared from IndexedDB');
                    resolve(true);
                };

                transaction.onerror = () => {
                    console.error('❌ Error clearing IndexedDB:', transaction.error);
                    reject(transaction.error);
                };
            });
        } catch (error) {
            console.error('❌ IndexedDB clear error:', error);
            return false;
        }
    }

    /**
     * ⭐ Get storage info for both languages
     */
    async getStorageInfo() {
        try {
            if (!this.db) await this.init();

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                
                const teluguRequest = store.get('telugu');
                const englishRequest = store.get('english');
                
                let teluguInfo = null;
                let englishInfo = null;
                
                teluguRequest.onsuccess = () => {
                    const result = teluguRequest.result;
                    if (result) {
                        teluguInfo = {
                            hasData: true,
                            size: JSON.stringify(result.data).length,
                            timestamp: result.timestamp,
                            version: result.version,
                            date: new Date(result.timestamp).toLocaleString()
                        };
                    }
                };
                
                englishRequest.onsuccess = () => {
                    const result = englishRequest.result;
                    if (result) {
                        englishInfo = {
                            hasData: true,
                            size: JSON.stringify(result.data).length,
                            timestamp: result.timestamp,
                            version: result.version,
                            date: new Date(result.timestamp).toLocaleString()
                        };
                    }
                };
                
                transaction.oncomplete = () => {
                    resolve({
                        telugu: teluguInfo || { hasData: false },
                        english: englishInfo || { hasData: false }
                    });
                };
                
                transaction.onerror = () => reject(transaction.error);
            });
        } catch (error) {
            console.error('❌ Error getting storage info:', error);
            return {
                telugu: { hasData: false, error: error.message },
                english: { hasData: false, error: error.message }
            };
        }
    }

    /**
     * Check if IndexedDB is supported
     */
    static isSupported() {
        return 'indexedDB' in window;
    }
}