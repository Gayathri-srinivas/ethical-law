// ============================================
// SEARCH ENGINE CLASS - FIXED MULTI-LANGUAGE
// ============================================

import { 
    BOOK_NAMES, 
    BOOK_NAMES_ENGLISH,
    BOOK_DISPLAY_NAMES,
    BOOK_DISPLAY_NAMES_ENGLISH,
    LANGUAGE 
} from './config.js';


// Top lo add cheyyi — file beginning lo
const TRANSLITERATION_MAP = {
    'a': 'అ', 'aa': 'ఆ', 'i': 'ఇ', 'ii': 'ఈ', 'u': 'ఉ', 'uu': 'ఊ',
    'e': 'ఎ', 'ee': 'ఏ', 'ai': 'ఐ', 'o': 'ఒ', 'oo': 'ఓ', 'au': 'ఔ',
    'ka': 'క', 'kha': 'ఖ', 'ga': 'గ', 'gha': 'ఘ',
    'cha': 'చ', 'chha': 'ఛ', 'ja': 'జ', 'jha': 'ఝ',
    'ta': 'త', 'tha': 'థ', 'da': 'ద', 'dha': 'ధ', 'na': 'న',
    'Ta': 'ట', 'Tha': 'ఠ', 'Da': 'డ', 'Dha': 'ఢ', 'Na': 'ణ',
    'pa': 'ప', 'pha': 'ఫ', 'ba': 'బ', 'bha': 'భ', 'ma': 'మ',
    'ya': 'య', 'ra': 'ర', 'la': 'ల', 'va': 'వ', 'wa': 'వ',
    'sa': 'స', 'sha': 'శ', 'Sha': 'ష', 'ha': 'హ', 'La': 'ళ',
    'ksha': 'క్ష', 'tra': 'త్ర',
    'mu': 'ము', 'su': 'సు', 'hu': 'హు', 'ru': 'రు',
    'saa': 'సా', 'haa': 'హా',
    'sam': 'సం', 'san': 'సన్',
};

function transliterateToTelugu(text) {
    // Already Telugu unicode unte return
    if (/[\u0C00-\u0C7F]/.test(text)) return text;
    
    let result = '';
    let i = 0;
    const lower = text.toLowerCase();
    
    while (i < lower.length) {
        // 4 chars try
        if (i + 4 <= lower.length && TRANSLITERATION_MAP[lower.slice(i, i+4)]) {
            result += TRANSLITERATION_MAP[lower.slice(i, i+4)];
            i += 4;
        }
        // 3 chars try
        else if (i + 3 <= lower.length && TRANSLITERATION_MAP[lower.slice(i, i+3)]) {
            result += TRANSLITERATION_MAP[lower.slice(i, i+3)];
            i += 3;
        }
        // 2 chars try
        else if (i + 2 <= lower.length && TRANSLITERATION_MAP[lower.slice(i, i+2)]) {
            result += TRANSLITERATION_MAP[lower.slice(i, i+2)];
            i += 2;
        }
        // 1 char
        else {
            result += lower[i];
            i++;
        }
    }
    return result;
}

export class SearchEngine {
    
    constructor(dataManager, navState) {
        this.dataManager = dataManager;
        this.navState = navState;
        this.searchTimeout = null;
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
    isBookInScope(bookIndex, scope) {
    if (!scope || scope === "all") return true;
    if (scope === "OT") return bookIndex < 39;
    if (scope === "NT") return bookIndex >= 39;
    const bookIndexFromName = BOOK_NAMES.indexOf(scope);
    if (bookIndexFromName !== -1) return bookIndex === bookIndexFromName;
    return true;
}

    async performSearch(query, scope = "all") {
    if (!query) return [];

    this.navState.savePreSearchLocation();
    this.scope = scope;
    
    // ⭐ Define here — top lo
    const normalizedQuery = query.toLowerCase().trim().replace(/\s+/g, ' ');
const teluguQuery = normalizedQuery; // ⭐ transliteration vaddu — direct search 
    
    console.log('🔍 Original query:', normalizedQuery);
    console.log('🔍 Telugu query:', teluguQuery);
    
    
    this.navState.lastSearchQuery = query;
    this.navState.isSearchActive = true;
    this.navState.cameFromSearch = false;

    const currentLanguages = (this.navState.currentLanguages && this.navState.currentLanguages.length > 0) 
    ? this.navState.currentLanguages 
    : [LANGUAGE.TELUGU, LANGUAGE.ENGLISH];

console.log('🔍 Searching with languages:', currentLanguages);
    console.log('🔍 Searching with languages:', currentLanguages);

    const results = [];
    const seenVerses = new Set();
    const seenBooks = new Set();
    const languageData = {};
    
    for (const lang of currentLanguages) {
        try {
            console.log(`📥 Loading ${lang} search data...`);
            const data = await this.dataManager.getSearchData(lang);
            if (data && Array.isArray(data) && data.length > 0) {
                languageData[lang] = data;
                console.log(`✅ Loaded ${lang}: ${data.length} books`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${lang}:`, error);
        }
    }

    const loadedLanguages = Object.keys(languageData);
    if (loadedLanguages.length === 0) return [];

    console.log(`✅ Successfully loaded: ${loadedLanguages.join(', ')}`);

    // Book name search
    for (let bookIndex = 0; bookIndex < BOOK_NAMES.length; bookIndex++) {
        if (!this.isBookInScope(bookIndex, scope)) continue;
        let bookMatched = false;
        
        for (const lang of loadedLanguages) {
            const bookNames = lang === LANGUAGE.ENGLISH ? BOOK_NAMES_ENGLISH : BOOK_NAMES;
            const normalizedBookName = bookNames[bookIndex].toLowerCase().trim();
            if (normalizedBookName.includes(normalizedQuery) || 
                normalizedBookName.includes(teluguQuery)) {
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
    if (!Array.isArray(data)) return results;

    console.log(`🔍 Scanning ${data.length} books...`);
    let totalVerses = 0;

    for (let b = 0; b < data.length; b++) {
        if (!this.isBookInScope(b, scope)) continue;
        const book = data[b];
        if (!book.Chapter || !Array.isArray(book.Chapter)) continue;

        for (let c = 0; c < book.Chapter.length; c++) {
            const chapter = book.Chapter[c];
            if (!chapter.Verse || !Array.isArray(chapter.Verse)) continue;

            totalVerses += chapter.Verse.length;

            for (let v = 0; v < chapter.Verse.length; v++) {
                const verseKey = `${b}-${c}-${v}`;
                if (seenVerses.has(verseKey)) continue;

                let matchedInAnyLanguage = false;

                for (const lang of loadedLanguages) {
                    const langData = languageData[lang];
                    const verseObj = langData?.[b]?.Chapter?.[c]?.Verse?.[v];
                    const verseText = verseObj?.Verse || '';
                    
                    // ⭐ normalizedQuery and teluguQuery both check
                    const normalizedText = verseText.toLowerCase().trim().replace(/\s+/g, ' ');
                    if (normalizedText.includes(normalizedQuery) || 
                        normalizedText.includes(teluguQuery)) {
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
                        resultData.teluguText = teluguData?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';
                        resultData.englishText = englishData?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';
                    } else {
                        const lang = loadedLanguages[0];
                        resultData.text = languageData[lang]?.[b]?.Chapter?.[c]?.Verse?.[v]?.Verse || '';
                        resultData.language = lang;
                    }

                    results.push(resultData);
                }
            }
        }
    }

    console.log(`📊 Scanned ${totalVerses} verses`);
    console.log(`✅ Found ${results.length} results`);
    
    return results;
}

    debounce(callback, delay) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(callback, delay);
    }

    clearDebounce() {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.scope = "all";
        }
    }
}
