// ============================================
// Bible App Configuration File - MULTI-LANGUAGE
// ============================================

/**
 * Application Settings
 */
export const CONFIG = {
    STORAGE_KEY: 'verse-colors',
    SEARCH_DEBOUNCE: 300,
    RESULTS_PER_PAGE: 100,
    SEARCH_PROGRESS_INTERVAL: 50,
    API_ENDPOINT: 'https://localhost/ethicallaw/getbook.php',
    API_ENDPOINT_ENGLISH: 'https://localhost/ethicallaw/getbook_english.php',
    SEARCH_DATA_FILE: 'https://localhost/ethicallaw/get_search_data.php',
    CACHE_VERSION: '2.0'
};

/**
 * Language Configuration
 */
export const LANGUAGE = {
    TELUGU: 'telugu',
    ENGLISH: 'english',
    BOTH: 'both',
    STORAGE_KEY: 'bible-app-language',
    DEFAULT: 'telugu'
};

/**
 * Default Values
 */
export const DEFAULTS = {
    INITIAL_BOOK: 0,
    INITIAL_CHAPTER: -1,
    NO_VERSE_SELECTED: -1,
    SCROLL_DELAY: 100,
    FIRST_BOOK_NUMBER: 1
};

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

export const THEME = {
    DARK: 'dark',
    LIGHT: 'light',
    STORAGE_KEY: 'bible-app-theme'
};

/**
 * CSS Class Names
 */
export const CSS_CLASSES = {
    ACTIVE: 'active',
    HIGHLIGHTED: 'highlighted',
    VERSE: 'verse',
    LOADING: 'loading',
    SEARCH_RESULT: 'search-result',
    ITEM: 'item',
    COMPACT: 'compact',
    SECTION: 'section',
    LIST: 'list',
    CLICKABLE_BOOK: 'clickable-book-title',
    CLICKABLE_CHAPTER: 'clickable-chapter-title',
    PARALLEL_VERSE: 'parallel-verse',
    TELUGU_TEXT: 'telugu-text',
    ENGLISH_TEXT: 'english-text'
};

/**
 * Zoom Configuration
 */
export const ZOOM = {
    MIN_SCALE: 0.7,
    MAX_SCALE: 1.8,
    STEP: 0.1,
    DEFAULT: 1.0,
    STORAGE_KEY: 'bible-zoom-level'
};

/**
 * DOM Element IDs
 */
export const ELEMENT_IDS = {
    CONTENT: 'content',
    SEARCH_TOGGLE: 'search-toggle',
    SEARCH_CONTAINER: 'search-container',
    SEARCH_INPUT: 'search-input',
    SEARCH_ICON: 'search-icon',
    CLEAR_ICON: 'clear-icon',
    HOME_ICON: 'home-icon',
    NAV_HEADER: 'nav-header',
    HEADER_TITLE: 'header-title',
    RESULT_COUNT: 'result-count',
    PREV_CHAPTER: 'prev-chapter-header',
    NEXT_CHAPTER: 'next-chapter-header',
    ZOOM_BTN: 'zoom-btn',
    ZOOM_MENU: 'zoom-menu',
    ZOOM_CONTROL: 'zoom-control',
    LANGUAGE_BTN: 'language-btn',
    LANGUAGE_MENU: 'language-menu'
};

/**
 * Scroll Behavior Options
 */
export const SCROLL_OPTIONS = {
    SMOOTH: { behavior: 'smooth', block: 'center' },
    INSTANT: { behavior: 'instant', block: 'center' },
    START: { behavior: 'smooth', block: 'start' }
};

/**
 * Book Names in Telugu (Full names)
 */
export const BOOK_NAMES = [
    "ఆదికాండము", "నిర్గమకాండము", "లేవీయకాండము", 
    "సంఖ్యాకాండము", "ద్వితీయోపదేశకాండము", "యెహోషువ",
    "న్యాయాధిపతులు", "రూతు", "సమూయేలు మొదటి గ్రంథము", 
    "సమూయేలు రెండవ గ్రంథము", "రాజులు మొదటి గ్రంథము",
    "రాజులు రెండవ గ్రంథము", "దినవృత్తాంతములు మొదటి గ్రంథము", 
    "దినవృత్తాంతములు రెండవ గ్రంథము", "ఎజ్రా", 
    "నెహెమ్యా", "ఎస్తేరు", "యోబు గ్రంథము",
    "కీర్తనల గ్రంథము", "సామెతలు", "ప్రసంగి", 
    "పరమగీతము", "యెషయా గ్రంథము", "యిర్మీయా", 
    "విలాపవాక్యములు", "యెహెజ్కేలు",
    "దానియేలు", "హోషేయ", "యోవేలు", "ఆమోసు", 
    "ఓబద్యా", "యోనా", "మీకా", "నహూము", 
    "హబక్కూకు", "జెఫన్యా",
    "హగ్గయి", "జెకర్యా", "మలాకీ", 
    "మత్తయి సువార్త", "మార్కు సువార్త", "లూకా సువార్త", 
    "యోహాను సువార్త", "అపొస్తలుల కార్యములు",
    "రోమీయులకు", "1 కొరింథీయులకు", "2 కొరింథీయులకు", 
    "గలతీయులకు", "ఎఫెసీయులకు", "ఫిలిప్పీయులకు",
    "కొలొస్సయులకు", "1 థెస్సలొనీకయులకు", 
    "2 థెస్సలొనీకయులకు", "1 తిమోతికి", "2 తిమోతికి", 
    "తీతుకు", "ఫిలేమోనుకు",
    "హెబ్రీయులకు", "యాకోబు", "1 పేతురు", "2 పేతురు", 
    "1 యోహాను", "2 యోహాను", "3 యోహాను", "యూదా", 
    "ప్రకటన గ్రంథము"
];

/**
 * English Book Names
 */
export const BOOK_NAMES_ENGLISH = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
    "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
    "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
    "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts",
    "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
    "Ephesians", "Philippians", "Colossians",
    "1 Thessalonians", "2 Thessalonians", "1 Timothy",
    "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
    "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
    "Jude", "Revelation"
];

/**
 * Book Display Names in Telugu (Short names)
 */
export const BOOK_DISPLAY_NAMES = [
    "ఆదికాండము", "నిర్గమకాండము", "లేవీయకాండము", 
    "సంఖ్యాకాండము", "ద్వితీయోపదేశకాండము", "యెహోషువ",
    "న్యాయాధిపతులు", "రూతు", "I సమూయేలు", "II సమూయేలు", 
    "I రాజులు", "II రాజులు", "I దినవృత్తాంతములు", 
    "II దినవృత్తాంతములు", "ఎజ్రా", "నెహెమ్యా", "ఎస్తేరు", 
    "యోబు", "కీర్తనలు", "సామెతలు", "ప్రసంగి", 
    "పరమగీతము", "యెషయా", "యిర్మీయా", "విలాపవాక్యములు", 
    "యెహెజ్కేలు", "దానియేలు", "హోషేయ", "యోవేలు", 
    "ఆమోసు", "ఓబద్యా", "యోనా", "మీకా", "నహూము", 
    "హబక్కూకు", "జెఫన్యా", "హగ్గయి", "జెకర్యా", "మలాకీ", 
    "మత్తయి", "మార్కు", "లూకా", "యోహాను", 
    "అపొస్తలుల కార్యములు", "రోమీయులకు", 
    "I కొరింథీయులకు", "II కొరింథీయులకు", "గలతీయులకు", 
    "ఎఫెసీయులకు", "ఫిలిప్పీయులకు", "కొలొస్సయులకు", 
    "I థెస్సలొనీకయులకు", "II థెస్సలొనీకయులకు", 
    "I తిమోతికి", "II తిమోతికి", "తీతుకు", "ఫిలేమోనుకు",
    "హెబ్రీయులకు", "యాకోబు", "I పేతురు", "II పేతురు", 
    "I యోహాను", "II యోహాను", "III యోహాను", "యూదా", 
    "ప్రకటన"
];

/**
 * English Display Names (Short)
 */
export const BOOK_DISPLAY_NAMES_ENGLISH = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
    "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
    "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
    "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts",
    "Romans", "1 Cor", "2 Cor", "Galatians",
    "Ephesians", "Philippians", "Colossians",
    "1 Thess", "2 Thess", "1 Timothy",
    "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
    "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
    "Jude", "Revelation"
];

/**
 * UI Text Constants
 */
export const UI_TEXT = {
    LOADING: 'Loading...',
    LOADING_ERROR: 'Loading error...',
    NO_VERSES: 'No verses found...',
    SEARCHING: 'Searching ...',
    SEARCH_FAILED: 'Search failed, Try again',
    NO_RESULTS: 'No results',
    TRY_DIFFERENT_WORDS: 'Please try different words',
    RESULTS_COUNT: 'Results',
    LOAD_MORE: 'See More',
    REMAINING: 'మిగిలి ఉన్నాయి',
    BOOKS_TITLE: 'Books',
    CHAPTERS_TITLE: 'Chapters',
    VERSES_TITLE: 'Verses',
    BOOK_MATCH_PREFIX: '📖 Book:',
    CLICK_TO_VIEW: 'Click to view books',
    LANGUAGE_TELUGU: 'తెలుగు',
    LANGUAGE_ENGLISH: 'English',
    LANGUAGE_PARALLEL: 'Parallel'
};

/**
 * Color Options for Verse Highlighting
 */
export const VERSE_COLORS = {
    YELLOW: 'yellow',
    GREEN: 'green',
    BLUE: 'blue',
    PINK: 'pink',
    ORANGE: 'orange',
    HIGHLIGHT: 'highlight',
    NONE: 'none'
};

export const ERROR_MESSAGES = {
    LOADING_FAILED: 'Loading failed',
    LOADING_ERROR: 'Error while loading...',
    NO_VERSES: 'No verses found...',
    NO_DATA: 'Data not available',
    NETWORK_ERROR: 'Network error - please try again',
    SEARCH_FAILED: 'Search failed. Please try again'
};

/**
 * Testament Information
 */
export const TESTAMENT_INFO = {
    OLD_TESTAMENT: {
        start: 0,
        end: 38,
        name: 'Old Testament' 
    },
    NEW_TESTAMENT: {
        start: 39,
        end: 65,
       name: 'New Testament' 
    }
};

/**
 * Book Categories
 */
export const BOOK_CATEGORIES = {
    LAW: { start: 0, end: 4, name: 'ధర్మశాస్త్రము' },
    HISTORY: { start: 5, end: 16, name: 'చారిత్రక గ్రంథాలు' },
    WISDOM: { start: 17, end: 21, name: 'జ్ఞాన గ్రంథాలు' },
    PROPHETS: { start: 22, end: 38, name: 'ప్రవక్తల గ్రంథాలు' },
    GOSPELS: { start: 39, end: 42, name: 'సువార్తలు' },
    ACTS: { start: 43, end: 43, name: 'అపొస్తలుల కార్యములు' },
    EPISTLES: { start: 44, end: 64, name: 'లేఖనములు' },
    REVELATION: { start: 65, end: 65, name: 'ప్రకటన' }
};

/**
 * Helper function to get book category
 */
export function getBookCategory(bookIndex) {
    for (const [key, value] of Object.entries(BOOK_CATEGORIES)) {
        if (bookIndex >= value.start && bookIndex <= value.end) {
            return value.name;
        }
    }
    return 'Unknown';
}

/**
 * Helper function to get testament
 */
export function getTestament(bookIndex) {
    if (bookIndex >= TESTAMENT_INFO.OLD_TESTAMENT.start && 
        bookIndex <= TESTAMENT_INFO.OLD_TESTAMENT.end) {
        return TESTAMENT_INFO.OLD_TESTAMENT.name;
    }
    if (bookIndex >= TESTAMENT_INFO.NEW_TESTAMENT.start && 
        bookIndex <= TESTAMENT_INFO.NEW_TESTAMENT.end) {
        return TESTAMENT_INFO.NEW_TESTAMENT.name;
    }
    return 'Unknown';
}

// ✅ NO TRANSLITERATION EXPORTS - Not needed anymore