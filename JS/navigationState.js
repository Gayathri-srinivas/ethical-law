/*

// Navigation state management
- NavigationState class
  - currentBook, currentChapter, currentVerse
  - isSearchActive, lastSearchQuery
  - savePreSearchLocation()
  - restorePreSearchLocation()
  
  
*/

import { DEFAULTS } from './config.js';


export class NavigationState {
    constructor() {
        this.currentBook = DEFAULTS.INITIAL_BOOK;
        this.currentChapter = DEFAULTS.INITIAL_CHAPTER;
        this.currentVerse = DEFAULTS.NO_VERSE_SELECTED;
        this.isSearchActive = false;
        this.lastSearchQuery = '';
        this.preSearchBook = 0;
        this.preSearchChapter = -1;
        this.cameFromSearch = false;
    }

    reset() {
        this.currentBook = 0;
        this.currentChapter = 0;
        this.currentVerse = -1;
        this.isSearchActive = false;
        this.lastSearchQuery = '';
    }

    savePreSearchLocation() {
        this.preSearchBook = this.currentBook;
        this.preSearchChapter = this.currentChapter;
    }

    restorePreSearchLocation() {
        this.currentBook = this.preSearchBook;
        this.currentChapter = this.preSearchChapter;
        this.currentVerse = -1;
    }
}