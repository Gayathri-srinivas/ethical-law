// ============================================
// UI RENDERER CLASS - CONFIGURATION OBJECT PATTERN
// ============================================

import { 
    BOOK_NAMES, 
    BOOK_DISPLAY_NAMES, 
    BOOK_DISPLAY_NAMES_ENGLISH, 
    UI_TEXT, 
    CONFIG,
    ELEMENT_IDS,     
    CSS_CLASSES,     
    DEFAULTS,        
    SCROLL_OPTIONS, 
    ERROR_MESSAGES,
    LANGUAGE
} from './config.js';

/**
 * UIRenderer handles all UI rendering operations
 * @class
 */
export class UIRenderer {
    
    constructor(dataManager, storageManager, navState, urlManager) {
        this.dataManager = dataManager;
        this.storageManager = storageManager;
        this.navState = navState;
        this.urlManager = urlManager;
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    
    
    

    static createItem(text, options = {}) {
        const { compact = false, dataset = {}, onClick } = options;
        const div = document.createElement('div');
        div.className = CSS_CLASSES.ITEM + (compact ? ' ' + CSS_CLASSES.COMPACT : '');
        div.textContent = text;
    
        if (dataset) {
            Object.entries(dataset).forEach(([key, value]) => {
                div.dataset[key] = value;
            });
        }
    
        if (onClick) {
            div.onclick = onClick;
        }
    
        return div;
    }
    
    static createClickableSpan(text, className, onClick) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = text;
        span.style.cursor = 'pointer';
        span.style.textDecoration = 'none';
        if (onClick) {
            span.onclick = onClick;
        }
        return span;
    }
    
    static createVerseDiv(verseObj, index, shouldHighlight = false) {
        const div = document.createElement('div');
        div.className = CSS_CLASSES.VERSE;
        div.dataset.verseIndex = index;
    
        if (shouldHighlight) {
            div.classList.add(CSS_CLASSES.HIGHLIGHTED);  // అదే class use చేయి
        }
    
        div.innerHTML = `<span class="verse-id">${index + 1}</span>${verseObj.Verse}`;
    
        return div;
    }
        
    static createVerseElement(verseObj, index, savedColor, isHighlighted) {
        const div = document.createElement('div');
        div.className = CSS_CLASSES.VERSE;
        div.dataset.verseIndex = index;
    
        if (savedColor) div.classList.add(`marked-${savedColor}`);
        if (isHighlighted) div.classList.add(CSS_CLASSES.HIGHLIGHTED);
    
        div.innerHTML = `<span class="verse-id">${index + 1}</span>${verseObj.Verse}`;
        return div;
    }
    
    getContentElement() {
        return document.getElementById(ELEMENT_IDS.CONTENT);
    }

    showLoading(message = UI_TEXT.LOADING) {
        const content = this.getContentElement();
        if (!content) return;
        
        content.innerHTML = `<div class="${CSS_CLASSES.LOADING}">${message}</div>`;
    }

    updateResultCount(count) {
        const resultCount = document.getElementById(ELEMENT_IDS.RESULT_COUNT);
        if (!resultCount) return;
        
        if (count > 0) {
            resultCount.textContent = `${UI_TEXT.RESULTS_COUNT}: ${count}`;
            resultCount.style.display = 'block';
        } else {
            resultCount.style.display = 'none';
        }
    }

    hideNavHeader() {
        const navHeader = document.getElementById(ELEMENT_IDS.NAV_HEADER);
        if (!navHeader) return;
        navHeader.style.display = 'none';
    }

    showNavHeader() {
        const navHeader = document.getElementById(ELEMENT_IDS.NAV_HEADER);
        if (!navHeader) return;
        navHeader.style.display = 'flex';
        navHeader.classList.add('hidden');
    }
    // ============================================
    // RENDER BOOKS LIST
    // ============================================
    
    /**
     * Renders the list of all books
     * 
     * CONFIGURATION OBJECT PATTERN:
     * - Single parameter object instead of multiple parameters
     * - Easy to add optional parameters
     * - Self-documenting code (named parameters)
     * 
     * @param {Object} config - Configuration object
     * @param {Function} config.onBookClick - Callback when book is clicked
     * @returns {Promise<void>}
     * 
     * @example
     * await uiRenderer.renderBooks({
     *     onBookClick: (index) => handleBookClick(index)
     * });
     */
       async renderBooks({ onBookClick }) {
        this.navState.isSearchActive = false;
        this.navState.cameFromSearch = false;
    
        const content = this.getContentElement();
        if (!content) return;
    
        content.innerHTML = '';
    
        const section = document.createElement('div');
        section.className = `${CSS_CLASSES.SECTION} books-layout`;
    
        // ✅ Handle multiple languages
        const showBoth = this.currentLanguages && this.currentLanguages.length === 2;
        const primaryLang = this.currentLanguages ? this.currentLanguages[0] : LANGUAGE.TELUGU;
    
        const h2 = document.createElement('h2');
        h2.textContent = UI_TEXT.BOOKS_TITLE;
        section.appendChild(h2);
        
        // ===== OLD TESTAMENT =====
        const oldTestamentCol = document.createElement('div');
        oldTestamentCol.className = 'testament-column';
    
        const oldTitle = document.createElement('h6');
        oldTitle.textContent = 'Old Testament';
        oldTitle.style.cssText = 'text-align: center; margin-bottom: 15px; color: #1e40af; margin-top:10px;';
        oldTestamentCol.appendChild(oldTitle);
    
        const oldList = document.createElement('div');
        oldList.className = 'testament-list';
        
        const oldListInner = document.createElement('div');
        oldListInner.className = CSS_CLASSES.LIST;
    
        for (let index = 0; index <= 38; index++) {
            const teluguName = BOOK_DISPLAY_NAMES[index];
            const englishName = BOOK_DISPLAY_NAMES_ENGLISH[index];
            
            let displayText;
            if (showBoth) {
                // Show both with primary on top
                displayText = primaryLang === LANGUAGE.TELUGU 
                    ? `${teluguName}\n${englishName}` 
                    : `${englishName}\n${teluguName}`;
            } else {
                displayText = primaryLang === LANGUAGE.ENGLISH ? englishName : teluguName;
            }
            
            const item = UIRenderer.createItem(displayText, {
                dataset: { bookIndex: index },
                onClick: () => onBookClick(index)
            });
            
            if (showBoth) {
                item.style.whiteSpace = 'pre-line';
                item.style.lineHeight = '1.5';
                item.style.textAlign = 'center';
            }
            
            oldListInner.appendChild(item);
        }
    
        oldList.appendChild(oldListInner);
        oldTestamentCol.appendChild(oldList);
        section.appendChild(oldTestamentCol);
    
        // ===== NEW TESTAMENT =====
        const newTestamentCol = document.createElement('div');
        newTestamentCol.className = 'testament-column';
    
        const newTitle = document.createElement('h6');
        newTitle.textContent = 'New Testament';
        newTitle.style.cssText = 'text-align: center; margin-bottom: 15px; color: #1e40af; margin-top:10px;';
        newTestamentCol.appendChild(newTitle);
    
        const newList = document.createElement('div');
        newList.className = 'testament-list';
        
        const newListInner = document.createElement('div');
        newListInner.className = CSS_CLASSES.LIST;
    
        for (let index = 39; index <= 65; index++) {
            const teluguName = BOOK_DISPLAY_NAMES[index];
            const englishName = BOOK_DISPLAY_NAMES_ENGLISH[index];
            
            let displayText;
            if (showBoth) {
                displayText = primaryLang === LANGUAGE.TELUGU 
                    ? `${teluguName}\n${englishName}` 
                    : `${englishName}\n${teluguName}`;
            } else {
                displayText = primaryLang === LANGUAGE.ENGLISH ? englishName : teluguName;
            }
            
            const item = UIRenderer.createItem(displayText, {
                dataset: { bookIndex: index },
                onClick: () => onBookClick(index)
            });
            
            if (showBoth) {
                item.style.whiteSpace = 'pre-line';
                item.style.lineHeight = '1.5';
                item.style.textAlign = 'center';
            }
            
            newListInner.appendChild(item);
        }
    
        newList.appendChild(newListInner);
        newTestamentCol.appendChild(newList);
        section.appendChild(newTestamentCol);
    
        content.appendChild(section);
    
        this.hideNavHeader();
        history.replaceState(null, '', window.location.pathname);
   }

    // ============================================
    // RENDER CHAPTERS LIST
    // ============================================
    
    /**
     * Renders the list of chapters for current book
     * 
     * @param {Object} config - Configuration object
     * @param {Function} config.onChapterClick - Callback when chapter is clicked
     * @param {Function} config.onBookTitleClick - Callback when book title is clicked
     * @returns {Promise<void>}
     * 
     * @example
     * await uiRenderer.renderChapters({
     *     onChapterClick: (index) => handleChapterClick(index),
     *     onBookTitleClick: () => showBooks()
     * });
     */
     async renderChapters({ onChapterClick, onBookTitleClick }) {
        this.navState.isSearchActive = false;
    
        const content = this.getContentElement();
        if (!content) return;
    
        const showBoth = this.currentLanguages && this.currentLanguages.length === 2;
        const primaryLang = this.currentLanguages ? this.currentLanguages[0] : LANGUAGE.TELUGU;
        
        const bookData = await this.dataManager.getBookData(
            this.navState.currentBook, 
            primaryLang
        );
    
        if (!bookData?.Chapter) {
            this.showLoading(ERROR_MESSAGES.LOADING_ERROR);
            return;
        }
    
        content.innerHTML = '';
    
        const section = document.createElement('div');
        section.className = CSS_CLASSES.SECTION;
    
        const h2 = document.createElement('h2');
    
        // ⭐ CHANGED: Show only primary language (not both)
        const bookNames = primaryLang === LANGUAGE.ENGLISH 
            ? BOOK_DISPLAY_NAMES_ENGLISH 
            : BOOK_DISPLAY_NAMES;
        const bookTitle = bookNames[this.navState.currentBook];
    
        const bookSpan = UIRenderer.createClickableSpan(
            bookTitle,
            CSS_CLASSES.CLICKABLE_BOOK,
            onBookTitleClick
        );
    
        h2.appendChild(bookSpan);
        h2.appendChild(document.createTextNode(' - Chapters'));
        section.appendChild(h2);
    
        const list = document.createElement('div');
        list.className = `${CSS_CLASSES.LIST} ${CSS_CLASSES.COMPACT}`;
    
        const fragment = document.createDocumentFragment();
        const numChapters = bookData.Chapter.length;
    
        for (let i = 0; i < numChapters; i++) {
            const item = UIRenderer.createItem(`${i + 1}`, {
                compact: true,
                onClick: () => onChapterClick(i)
            });
            fragment.appendChild(item);
        }
    
        list.appendChild(fragment);
        section.appendChild(list);
        content.appendChild(section);
    
        this.hideNavHeader();
    }

    // ============================================
    // RENDER VERSE SELECTION
    // ============================================
    
    /**
     * Renders the list of verse numbers for current chapter
     * 
     * @param {Object} config - Configuration object
     * @param {Function} config.onVerseClick - Callback when verse is clicked
     * @param {Function} config.onBookTitleClick - Callback when book title is clicked
     * @param {Function} config.onChapterTitleClick - Callback when chapter title is clicked
     * @returns {Promise<void>}
     * 
     * @example
     * await uiRenderer.renderVerseSelection({f
     *     onVerseClick: (index) => handleVerseClick(index),
     *     onBookTitleClick: () => showBooks(),
     *     onChapterTitleClick: () => showChapters()
     * });
     */
    async renderVerseSelection({ onVerseClick, onBookTitleClick, onChapterTitleClick }) {
        this.navState.isSearchActive = false;
    
        const content = this.getContentElement();
        if (!content) return;
    
        const showBoth = this.currentLanguages && this.currentLanguages.length === 2;
        const primaryLang = this.currentLanguages ? this.currentLanguages[0] : LANGUAGE.TELUGU;
        
        const bookData = await this.dataManager.getBookData(
            this.navState.currentBook,
            primaryLang
        );
        
        if (!bookData?.Chapter?.[this.navState.currentChapter]) {
            this.showLoading(ERROR_MESSAGES.LOADING_ERROR);
            return;
        }
    
        const verses = bookData.Chapter[this.navState.currentChapter].Verse;
        if (!verses || !Array.isArray(verses)) {
            this.showLoading(ERROR_MESSAGES.NO_VERSES);
            return;
        }
    
        content.innerHTML = '';
    
        const section = document.createElement('div');
        section.className = CSS_CLASSES.SECTION;
    
        const h2 = document.createElement('h2');
    
        // ⭐ CHANGED: Show only primary language (not both)
        const bookNames = primaryLang === LANGUAGE.ENGLISH 
            ? BOOK_DISPLAY_NAMES_ENGLISH 
            : BOOK_DISPLAY_NAMES;
        const bookTitle = bookNames[this.navState.currentBook];
    
        const bookSpan = UIRenderer.createClickableSpan(
            bookTitle,
            CSS_CLASSES.CLICKABLE_BOOK,
            onBookTitleClick
        );
    
        const chapterSpan = UIRenderer.createClickableSpan(
            `${this.navState.currentChapter + 1}`,
            CSS_CLASSES.CLICKABLE_CHAPTER,
            onChapterTitleClick
        );
    
        h2.appendChild(bookSpan);
        h2.appendChild(document.createTextNode(' '));
        h2.appendChild(chapterSpan);
        h2.appendChild(document.createTextNode(' - Verses'));
        section.appendChild(h2);
    
        const list = document.createElement('div');
        list.className = `${CSS_CLASSES.LIST} ${CSS_CLASSES.COMPACT}`;
    
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < verses.length; i++) {
            const item = UIRenderer.createItem(`${i + 1}`, {
                compact: true,
                onClick: () => onVerseClick(i)
            });
            fragment.appendChild(item);
        }
    
        list.appendChild(fragment);
        section.appendChild(list);
        content.appendChild(section);
    
        this.hideNavHeader();
    }

    // ============================================
    // RENDER VERSE CONTENT
    // ============================================
    
    /**
     * Renders full chapter with verses
     * 
     * CONFIGURATION OBJECT PATTERN WITH DEFAULTS:
     * - Optional parameters with default values
     * - Destructuring makes defaults clear
     * 
     * @param {Object} config - Configuration object
     * @param {number} [config.highlightVerse=-1] - Verse index to highlight (default: -1)
     * @param {Function} config.onBookTitleClick - Callback when book title is clicked
     * @param {Function} config.onChapterTitleClick - Callback when chapter title is clicked
     * @returns {Promise<void>}
     * 
     * @example
     * // Without highlight
     * await uiRenderer.renderVerseContent({
     *     onBookTitleClick: () => showBooks(),
     *     onChapterTitleClick: () => showChapters()
     * });
     * 
     * // With highlight
     * await uiRenderer.renderVerseContent({
     *     highlightVerse: 5,
     *     onBookTitleClick: () => showBooks(),
     *     onChapterTitleClick: () => showChapters()
     * });
     */
  // Update the renderVerseContent method in UIRenderer class
    
       async renderVerseContent({
        highlightVerse = DEFAULTS.NO_VERSE_SELECTED,
        languages = [LANGUAGE.TELUGU],
        onBookTitleClick,
        onChapterTitleClick
    }) {
        this.navState.isSearchActive = false;
    
        const content = this.getContentElement();
        if (!content) return;
    
        const showBoth = languages.length === 2;
        const primaryLang = languages[0];
    
        // Load data for both languages if needed
        let teluguData, englishData;
        
        if (showBoth) {
            [teluguData, englishData] = await Promise.all([
                this.dataManager.getBookData(this.navState.currentBook, LANGUAGE.TELUGU),
                this.dataManager.getBookData(this.navState.currentBook, LANGUAGE.ENGLISH)
            ]);
        } else {
            if (primaryLang === LANGUAGE.ENGLISH) {
                englishData = await this.dataManager.getBookData(this.navState.currentBook, LANGUAGE.ENGLISH);
            } else {
                teluguData = await this.dataManager.getBookData(this.navState.currentBook, LANGUAGE.TELUGU);
            }
        }
    
        const bookData = primaryLang === LANGUAGE.ENGLISH ? englishData : teluguData;
    
        if (!bookData?.Chapter?.[this.navState.currentChapter]) {
            this.showLoading('Loading Issue...');
            return;
        }
    
        this.updateHeaderNavigation({ onBookTitleClick, onChapterTitleClick, primaryLang });
    
        content.innerHTML = '';
    
        const section = document.createElement('div');
        section.className = CSS_CLASSES.SECTION;
    
        const verses = bookData.Chapter[this.navState.currentChapter].Verse ?? [];
    
        if (!Array.isArray(verses) || verses.length === 0) {
            this.showLoading('No verses...');
            return;
        }
    
        const fragment = document.createDocumentFragment();
    
        verses.forEach((verseObj, index) => {
            const savedColor = this.storageManager.getVerseColor(
                this.navState.currentBook,
                this.navState.currentChapter,
                index
            );
    
            const isTempHighlighted = index === highlightVerse;
    
            let verseDiv;
            
  if (showBoth) {
    verseDiv = document.createElement('div');
    verseDiv.className = CSS_CLASSES.VERSE;
    verseDiv.dataset.verseIndex = index;

    if (savedColor) verseDiv.classList.add(`marked-${savedColor}`);
    if (isTempHighlighted) verseDiv.classList.add(CSS_CLASSES.HIGHLIGHTED);

    const teluguVerse = teluguData.Chapter[this.navState.currentChapter].Verse[index];
    const englishVerse = englishData.Chapter[this.navState.currentChapter].Verse[index];

    const verseNumber = `<span class="verse-id">${index + 1}</span>`;

    // ⭐ Telugu first (Telugu on top)
    if (primaryLang === LANGUAGE.TELUGU) {
        verseDiv.innerHTML = `
            ${verseNumber}
            <div class="telugu-text" style="margin-bottom: 8px; font-size: 1.1em; line-height: 1.6;">
                ${teluguVerse.Verse}
            </div>
            <div class="english-text" style="color: #aaa; font-size: 1em; line-height: 1.5;">
                ${englishVerse.Verse}
            </div>
        `;
    } 
    // ⭐ English first (English on top)
    else {
        verseDiv.innerHTML = `
            ${verseNumber}
            <div class="english-text" style="margin-bottom: 8px; font-size: 1.1em; line-height: 1.6;">
                ${englishVerse.Verse}
            </div>
            <div class="telugu-text" style="color: #aaa; font-size: 1em; line-height: 1.5;">
                ${teluguVerse.Verse}
            </div>
        `;
    }
} else {
                // Single language verse
                verseDiv = UIRenderer.createVerseElement(
                    verseObj,
                    index,
                    savedColor,
                    isTempHighlighted
                );
            }
    
            verseDiv.onclick = (e) => {
                e.stopPropagation();
                
                const currentlyHighlighted = verseDiv.classList.contains(CSS_CLASSES.HIGHLIGHTED);
                
                if (currentlyHighlighted) {
                    verseDiv.classList.remove(CSS_CLASSES.HIGHLIGHTED);
                    this.storageManager.setVerseColor(
                        this.navState.currentBook,
                        this.navState.currentChapter,
                        index,
                        'none'
                    );
                } else {
                    verseDiv.classList.add(CSS_CLASSES.HIGHLIGHTED);
                    this.storageManager.setVerseColor(
                        this.navState.currentBook,
                        this.navState.currentChapter,
                        index,
                        'highlighted'
                    );
                }
            };
    
            fragment.appendChild(verseDiv);
        });
    
        section.appendChild(fragment);
        content.appendChild(section);
    
        if (highlightVerse !== DEFAULTS.NO_VERSE_SELECTED) {
            setTimeout(() => {
                const target = section.querySelector(`[data-verse-index="${highlightVerse}"]`);
                target?.scrollIntoView(SCROLL_OPTIONS.SMOOTH);
            }, DEFAULTS.SCROLL_DELAY);
        }
    }
    
    /**
     * ⭐ Create verse element with multi-language support
     */
    static createMultiLangVerseElement(teluguVerse, englishVerse, index, savedColor, isHighlighted, language) {
        const div = document.createElement('div');
        div.className = CSS_CLASSES.VERSE;
        div.dataset.verseIndex = index;
    
        if (savedColor) div.classList.add(`marked-${savedColor}`);
        if (isHighlighted) div.classList.add(CSS_CLASSES.HIGHLIGHTED);
    
        const verseNumber = `<span class="verse-id">${index + 1}</span>`;
        
        if (language === LANGUAGE.PARALLEL && teluguVerse && englishVerse) {
            // Parallel view - Telugu larger, English smaller
            div.innerHTML = `
                ${verseNumber}
                <div class="${CSS_CLASSES.PARALLEL_VERSE}">
                    <div class="${CSS_CLASSES.TELUGU_TEXT}">
                        ${teluguVerse.Verse}
                    </div>
                    <div class="${CSS_CLASSES.ENGLISH_TEXT}">
                        ${englishVerse.Verse}
                    </div>
                </div>
            `;
        } else if (language === LANGUAGE.ENGLISH && englishVerse) {
            div.innerHTML = `${verseNumber}${englishVerse.Verse}`;
        } else if (teluguVerse) {
            div.innerHTML = `${verseNumber}${teluguVerse.Verse}`;
        }
    
        return div;
    }

    // ============================================
    // UPDATE HEADER NAVIGATION
    // ============================================
    
    /**
     * Updates the navigation header with book and chapter info
     * 
     * @param {Object} config - Configuration object
     * @param {Function} config.onBookTitleClick - Callback when book title is clicked
     * @param {Function} config.onChapterTitleClick - Callback when chapter title is clicked
     * @returns {void}
     */
       updateHeaderNavigation({ onBookTitleClick, onChapterTitleClick, primaryLang }) {
            const headerTitle = document.getElementById(ELEMENT_IDS.HEADER_TITLE);
            if (!headerTitle) return;
        
            const lang = primaryLang || (this.currentLanguages ? this.currentLanguages[0] : LANGUAGE.TELUGU);
            
            // ⭐ CHANGED: Always show only first/primary language in header (not both)
            const bookNames = lang === LANGUAGE.ENGLISH 
                ? BOOK_DISPLAY_NAMES_ENGLISH 
                : BOOK_DISPLAY_NAMES;
            const bookTitle = bookNames[this.navState.currentBook];
        
            const bookNameSpan = `<span class="clickable-book">${bookTitle}</span>`;
            const chapterSpan = `<span class="clickable-chapter">${this.navState.currentChapter + 1}</span>`;
            headerTitle.innerHTML = `${bookNameSpan} - ${chapterSpan}`;
        
            const clickableBook = headerTitle.querySelector('.clickable-book');
            if (clickableBook) {
                clickableBook.onclick = onBookTitleClick;
            }
        
            const clickableChapter = headerTitle.querySelector('.clickable-chapter');
            if (clickableChapter) {
                clickableChapter.onclick = onChapterTitleClick;
            }
        
            const cacheKey = `${this.navState.currentBook}_${lang}`;
            const bookData = this.dataManager.loadedBooks?.[cacheKey];
            const prevBtn = document.getElementById(ELEMENT_IDS.PREV_CHAPTER);
            const nextBtn = document.getElementById(ELEMENT_IDS.NEXT_CHAPTER);
        
            if (prevBtn) {
                prevBtn.disabled = this.navState.currentChapter === DEFAULTS.INITIAL_CHAPTER && 
                                  this.navState.currentBook === DEFAULTS.INITIAL_BOOK;
            }
            
            if (nextBtn && bookData?.Chapter) {
                nextBtn.disabled = this.navState.currentChapter === bookData.Chapter.length - 1 
                                && this.navState.currentBook === BOOK_NAMES.length - 1;
            }
        
            this.showNavHeader();
  }

    // ============================================
    // RENDER SEARCH RESULTS
    // ============================================
    
    /**
     * Renders search results with pagination
     * 
     * CONFIGURATION OBJECT PATTERN - BEST EXAMPLE:
     * - Multiple parameters organized
     * - Optional maxDisplay parameter with default
     * - Clear, self-documenting
     * 
     * @param {Object} config - Configuration object
     * @param {Array} config.results - Search results array
     * @param {string} config.query - Search query string
     * @param {SearchEngine} config.searchEngine - SearchEngine instance for highlighting
     * @param {Function} config.onResultClick - Callback when result is clicked
     * @param {number} [config.maxDisplay=100] - Maximum results to display initially
     * @returns {void}
     * 
     * @example
     * uiRenderer.renderSearchResults({
     *     results: searchResults,
     *     query: "ప్రేమ",
     *     searchEngine: this.searchEngine,
     *     onResultClick: (result) => this.handleResultClick(result),
     *     maxDisplay: 50  // Optional: override default
     * });
     */
renderSearchResults({ results, query, searchEngine, onResultClick, maxDisplay = 100 }) {
    const content = this.getContentElement();
    if (!content) return;

    this.updateResultCount(results.length);

    if (results.length === 0) {
        this.renderEmptySearchResults(query);
        return;
    }

    this.renderSearchResultsContainer(content);
    const container = content.querySelector('.search-results');

    // ✅ Show initial results
    const fragment = document.createDocumentFragment();
    const initialResults = results.slice(0, maxDisplay);
    
    initialResults.forEach(result => {
        const item = this.createSearchResultItem(result, query, searchEngine, onResultClick);
        fragment.appendChild(item);
    });
    
    container.appendChild(fragment);

    // ✅ Add Load More button if needed
    if (results.length > maxDisplay) {
        let currentDisplay = maxDisplay;
        
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'load-more-btn';
        loadMoreBtn.innerHTML = `
            <span class="btn-icon">⬇️</span>
            <span class="btn-text">See more</span>
            <span class="btn-count">(${results.length - currentDisplay} Left)</span>
        `;
        
        loadMoreBtn.style.cssText = `
            width: 100%;
            padding: 16px 20px;
            margin: 25px 0;
            background: linear-gradient(135deg, rgb(73 157 239) 0%, rgb(26 26 46) 100%);
            color: #fff;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-family: inherit;
        `;

        loadMoreBtn.onmouseenter = () => {
            loadMoreBtn.style.transform = 'translateY(-2px)';
            loadMoreBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            loadMoreBtn.style.background = 'linear-gradient(135deg, rgb(73 157 239) 0%, rgb(26 26 46) 100%);';
        };
        
        loadMoreBtn.onmouseleave = () => {
            loadMoreBtn.style.transform = 'translateY(0)';
            loadMoreBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            loadMoreBtn.style.background = 'linear-gradient(135deg, rgb(73 157 239) 0%, rgb(26 26 46) 100%);';
        };

        loadMoreBtn.onclick = () => {
            // Show loading state
            loadMoreBtn.innerHTML = `
                <span class="btn-icon">⏳</span>
                <span class="btn-text">Loading...</span>
            `;
            loadMoreBtn.style.opacity = '0.7';
            loadMoreBtn.style.cursor = 'wait';
            
            setTimeout(() => {
                // Calculate next batch
                const nextBatch = Math.min(currentDisplay + 100, results.length);
                const newResults = results.slice(currentDisplay, nextBatch);
                
                // ✅ FIX: Create NEW fragment for new results
                const newFragment = document.createDocumentFragment();
                newResults.forEach(result => {
                    const item = this.createSearchResultItem(result, query, searchEngine, onResultClick);
                    newFragment.appendChild(item);  // ✅ Correct: Using newFragment
                });
                
                // Insert before button
                container.insertBefore(newFragment, loadMoreBtn);
                
                // Update counter
                currentDisplay = nextBatch;
                
                // Reset button state
                loadMoreBtn.style.opacity = '1';
                loadMoreBtn.style.cursor = 'pointer';
                
                // Remove button if all loaded
                if (currentDisplay >= results.length) {
                    loadMoreBtn.innerHTML = `
                        <span class="btn-icon">✅</span>
                        <span class="btn-text">All results loaded!</span>
                    `;
                    
                    setTimeout(() => {
                        loadMoreBtn.style.opacity = '0';
                        setTimeout(() => loadMoreBtn.remove(), 300);
                    }, 1500);
                } else {
                    loadMoreBtn.innerHTML = `
                        <span class="btn-icon">⬇️</span>
                        <span class="btn-text">See more</span>
                        <span class="btn-count">(${results.length - currentDisplay} Left)</span>
                    `;
                }
            }, 300);
        };

        container.appendChild(loadMoreBtn);
    }

    this.hideNavHeader();
}
    renderSearchResultsContainer(content) {
        content.innerHTML = `<div class="${CSS_CLASSES.SECTION}"><div class="search-results"></div></div>`;
    }
    
    renderInitialResults({ results, query, searchEngine, onResultClick, container, maxDisplay }) {
        const fragment = document.createDocumentFragment();
        const slice = results.slice(0, maxDisplay);
    
        slice.forEach(result => {
            const item = this.createSearchResultItem(result, query, searchEngine, onResultClick);
            fragment.appendChild(item);
        });
    
        container.appendChild(fragment);
    }
    
    createSearchResultItem(result, query, searchEngine, onResultClick) {
        const item = document.createElement('div');
        item.className = `${CSS_CLASSES.ITEM} ${CSS_CLASSES.SEARCH_RESULT}`;
    
        if (result.isBookMatch) {
            const highlightedBook = searchEngine.highlightText(result.bookName, query);
            item.innerHTML = `
                <strong>📖 ${highlightedBook}</strong><br>
                <span style="font-size:0.9em;">Click to view chapters</span>
            `;
        } else {
            const showBoth = result.languages && result.languages.length === 2;
            
            let verseHTML = '';
            
            if (showBoth) {
                const teluguHighlighted = searchEngine.highlightText(result.teluguText, query);
                const englishHighlighted = searchEngine.highlightText(result.englishText, query);
                
                // ⭐ FIX: Respect user's language order
                if (result.languages[0] === LANGUAGE.TELUGU) {
                    // Telugu selected first - Telugu పైన, English కింద
                    verseHTML = `
                        <div style="margin-bottom: 8px; font-size: 1em; line-height: 1.6;">
                            ${teluguHighlighted}
                        </div>
                        <div style="color: #aaa; font-size: 0.9em; line-height: 1.5;">
                            ${englishHighlighted}
                        </div>
                    `;
                } else {
                    // English selected first - English పైన, Telugu కింద
                    verseHTML = `
                        <div style="margin-bottom: 8px; font-size: 1em; line-height: 1.6;">
                            ${englishHighlighted}
                        </div>
                        <div style="color: #aaa; font-size: 0.9em; line-height: 1.5;">
                            ${teluguHighlighted}
                        </div>
                    `;
                }
            } else {
                const highlightedText = searchEngine.highlightText(result.text, query);
                verseHTML = `<span style="font-size:0.95em;">${highlightedText}</span>`;
            }
            
            item.innerHTML = `
                <strong>${result.bookName} ${result.chapterIndex + 1}:${result.verseIndex + 1}</strong><br>
                ${verseHTML}
            `;
        }
    
        item.onclick = () => onResultClick(result);
        return item;
    }
    // ============================================
    // ADD LOAD MORE BUTTON
    // ============================================
    
    /**
     * Adds a "Load More" button for paginated results
     * 
     * @param {Object} config - Configuration object
     * @param {HTMLElement} config.container - Container element
     * @param {Function} config.renderCallback - Function to render next batch
     * @param {number} config.initialDisplay - Initial number of displayed items
     * @param {number} config.totalResults - Total number of results
     * @returns {void}
     */
    addLoadMoreButton({ container, renderCallback, initialDisplay, totalResults }) {
        let currentDisplay = initialDisplay;
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'load-more-btn';
        loadMoreBtn.textContent = `See more (${totalResults - currentDisplay} Left)`;
        loadMoreBtn.style.cssText = `
            width: 100%; 
            padding: 15px; 
            margin: 20px 0; 
            background: #2a2a2a; 
            color: #fff; 
            border: 2px solid #555; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 16px; 
            transition: all 0.3s;
        `;

        loadMoreBtn.onmouseover = () => {
            loadMoreBtn.style.background = '#3a3a3a';
            loadMoreBtn.style.borderColor = '#777';
        };
        
        loadMoreBtn.onmouseout = () => {
            loadMoreBtn.style.background = '#2a2a2a';
            loadMoreBtn.style.borderColor = '#555';
        };

        loadMoreBtn.onclick = () => {
            const nextBatch = Math.min(currentDisplay + CONFIG.RESULTS_PER_PAGE, totalResults);
            renderCallback(currentDisplay, nextBatch);
            currentDisplay = nextBatch;

            if (currentDisplay >= totalResults) {
                loadMoreBtn.remove();
            } else {
                loadMoreBtn.textContent = `మరిన్ని చూడండి (${totalResults - currentDisplay} మిగిలి ఉన్నాయి)`;
                container.appendChild(loadMoreBtn);
            }
        };

        container.appendChild(loadMoreBtn);
    }
}

// ============================================
// PATTERN COMPARISON
// ============================================

/*
❌ BEFORE - Multiple Parameters:
renderSearchResults(results, query, searchEngine, onResultClick) {
    // Hard to remember parameter order
    // Can't skip parameters
    // No default values
}

// Calling:
this.uiRenderer.renderSearchResults(
    results,
    query,
    this.searchEngine,
    (result) => this.handleClick(result)
);

✅ AFTER - Configuration Object:
renderSearchResults({ results, query, searchEngine, onResultClick, maxDisplay = 100 }) {
    // Self-documenting
    // Can skip optional parameters
    // Easy to add new parameters
}

// Calling:
this.uiRenderer.renderSearchResults({
    results,              // Clear what each parameter is
    query,
    searchEngine: this.searchEngine,
    onResultClick: (result) => this.handleClick(result),
    maxDisplay: 50        // Optional override
});

BENEFITS:
✅ Parameter order doesn't matter
✅ Optional parameters with defaults
✅ Self-documenting code
✅ Easy to extend with new parameters
✅ IDE autocomplete works better
*/