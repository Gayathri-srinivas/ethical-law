// ============================================
// SEARCH ENGINE CLASS - FIXED MULTI-LANGUAGE
// + SEARCH SCOPE SUPPORT
// ============================================

import { 
    BOOK_NAMES, 
    BOOK_NAMES_ENGLISH,
    BOOK_DISPLAY_NAMES,
    BOOK_DISPLAY_NAMES_ENGLISH,
    LANGUAGE 
} from './config.js';

export class SearchEngine {
    
    constructor(dataManager, navState) {
        this.dataManager = dataManager;
        this.navState = navState;
        this.searchTimeout = null;

        // NEW
        this.scope = "all";
    }

    getBookName(bookIndex, languages) {
        if (!languages || languages.length === 0) {
            return BOOK_NAMES[bookIndex];
        }

        if (languages.length === 2) {
            const teluguName = BOOK_DISPLAY_NAMES[bookIndex];
            const englishName = BOOK_DISPLAY_NAMES_ENGLISH[bookIndex];
            
            return languages[0] === LANGUAGE.TELUGU 
                ? `${teluguName} / ${englishName}`
                : `${englishName} / ${teluguName}`;
        }

        return languages[0] === LANGUAGE.ENGLISH 
            ? BOOK_DISPLAY_NAMES_ENGLISH[bookIndex]
            : BOOK_DISPLAY_NAMES[bookIndex];
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // ============================================
    // NEW: CHECK BOOK IN SCOPE
    // ============================================

    isBookInScope(bookIndex, scope) {

        if (!scope || scope === "all") return true;

        if (scope === "OT") return bookIndex < 39;

        if (scope === "NT") return bookIndex >= 39;

        // specific book
        const bookIndexFromName = BOOK_NAMES.indexOf(scope);

        if (bookIndexFromName !== -1) {
            return bookIndex === bookIndexFromName;
        }

        return true;
    }

    // ============================================
    // SEARCH
    // ============================================

    async performSearch(query, scope = "all", shouldPushHistory = true) {

        if (!query) return [];

        this.scope = scope;

        this.navState.savePreSearchLocation();
        
        query = query.toLowerCase().trim().replace(/\s+/g, ' ');
        
        this.navState.lastSearchQuery = query;
        this.navState.isSearchActive = true;
        this.navState.cameFromSearch = false;

        const currentLanguages = this.navState.currentLanguages || [LANGUAGE.TELUGU];

        const results = [];
        const seenVerses = new Set();
        const seenBooks = new Set();

        const languageData = {};
        
        for (const lang of currentLanguages) {

            try {
                const data = await this.dataManager.getSearchData(lang);
                
                if (data && Array.isArray(data)) {
                    languageData[lang] = data;
                }

            } catch (error) {
                console.error(`Error loading ${lang}`, error);
            }
        }

        const loadedLanguages = Object.keys(languageData);

        if (loadedLanguages.length === 0) {
            return [];
        }

        // ============================================
        // BOOK NAME SEARCH
        // ============================================

        for (let bookIndex = 0; bookIndex < BOOK_NAMES.length; bookIndex++) {

            // ⭐ scope filter
            if (!this.isBookInScope(bookIndex, scope)) continue;

            let bookMatched = false;
            
            for (const lang of loadedLanguages) {

                const bookNames = lang === LANGUAGE.ENGLISH 
                    ? BOOK_NAMES_ENGLISH 
                    : BOOK_NAMES;

                const normalizedBookName =
                    bookNames[bookIndex].toLowerCase().trim();
                
                if (normalizedBookName.includes(query)) {
                    bookMatched = true;
                    break;
                }
            }
            
            if (bookMatched && !seenBooks.has(bookIndex)) {

                seenBooks.add(bookIndex);

                results.push({
                    bookIndex,
                    isBookMatch: true,
                    bookName: this.getBookName(bookIndex, loadedLanguages)
                });
            }
        }

        const firstLang = loadedLanguages[0];
        const data = languageData[firstLang];

        if (!Array.isArray(data)) {
            return results;
        }

        // ============================================
        // VERSE SEARCH
        // ============================================

        for (let b = 0; b < data.length; b++) {

            // ⭐ scope filter
            if (!this.isBookInScope(b, scope)) continue;

            const book = data[b];
            
            if (!book.Chapter) continue;

            for (let c = 0; c < book.Chapter.length; c++) {

                const chapter = book.Chapter[c];

                if (!chapter.Verse) continue;

                for (let v = 0; v < chapter.Verse.length; v++) {

                    const verseKey = `${b}-${c}-${v}`;

                    if (seenVerses.has(verseKey)) continue;

                    let matchedInAnyLanguage = false;
                    
                    for (const lang of loadedLanguages) {

                        const langData = languageData[lang];

                        const verseText =
                            langData?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';

                        const normalizedText = verseText
                            .toLowerCase()
                            .trim()
                            .replace(/\s+/g, ' ');

                        if (normalizedText.includes(query)) {
                            matchedInAnyLanguage = true;
                            break;
                        }
                    }
                    
                    if (matchedInAnyLanguage) {

                        seenVerses.add(verseKey);
                        
                        let resultData = {
                            bookIndex: b,
                            chapterIndex: c,
                            verseIndex: v,
                            bookName: this.getBookName(b, loadedLanguages),
                            isBookMatch: false,
                            languages: loadedLanguages
                        };

                        if (loadedLanguages.length === 2) {

                            const teluguData = languageData[LANGUAGE.TELUGU];
                            const englishData = languageData[LANGUAGE.ENGLISH];
                            
                            resultData.teluguText =
                                teluguData?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';

                            resultData.englishText =
                                englishData?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';

                        } else {

                            const lang = loadedLanguages[0];
                            const langData = languageData[lang];

                            resultData.text =
                                langData?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';

                            resultData.language = lang;
                        }

                        results.push(resultData);
                    }
                }
            }
        }

        return results;
    }

    // ============================================
    // DEBOUNCE
    // ============================================

    debounce(callback, delay) {

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(callback, delay);
    }

    clearDebounce() {

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }
    }
}