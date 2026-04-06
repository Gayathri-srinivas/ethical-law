/*

// URL handling
- URLManager class
  - updateURL()
  - loadStateFromURL()

*/

export class URLManager {
    constructor(navState) {
        this.navState = navState;
    }

  
    updateURL(pushHistory = false) {
    const params = new URLSearchParams();
    
    if (this.navState.isSearchActive && this.navState.lastSearchQuery) {
        params.set('search', this.navState.lastSearchQuery);
    } else {
        params.set('book', this.navState.currentBook);
        
        // ✅ Add chapter if it's >= 0 (not -1)
        if (this.navState.currentChapter >= 0) {
            params.set('chapter', this.navState.currentChapter);
        }
        
        // ✅ Add verse if it's >= 0
        if (this.navState.currentVerse >= 0) {
            params.set('verse', this.navState.currentVerse);
        }
    }
    
    if (pushHistory) {
        history.pushState(null, '', '?' + params.toString());
    } else {
        history.replaceState(null, '', '?' + params.toString());
    }
}

    loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    
    if (searchParam) {
        return {
            type: 'search',
            query: searchParam
        };
    }
    
    const bookParam = params.get('book');
    if (bookParam === null) {  // ✅ Explicit null check
        return { type: 'books' };
    }
    
    this.navState.currentBook = parseInt(bookParam);
    
    const chapterParam = params.get('chapter');
    if (chapterParam === null) {  // ✅ Explicit null check
        return { type: 'chapters' };
    }
    
    this.navState.currentChapter = parseInt(chapterParam);
    
    const verseParam = params.get('verse');
    if (verseParam !== null) {
        this.navState.currentVerse = parseInt(verseParam);
        return { type: 'verse', verseIndex: this.navState.currentVerse };
    }
    
    return { type: 'verseSelection' };
}
}