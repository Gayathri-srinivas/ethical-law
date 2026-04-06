/*
// Local storage handling
- StorageManager class
  - loadVerseColors()
  - saveVerseColors()
  - getVerseColor()
  - setVerseColor()
*/

import { CONFIG, THEME, ZOOM, LANGUAGE } from './config.js';  // ⭐ Add FONT

export class StorageManager {
    constructor() {
        this.verseColors = {};
        this.loadVerseColors();
        this.currentZoom = this.loadZoomLevel();  
    }

    loadVerseColors() {
        try {
            const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (saved) {
                this.verseColors = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading verse colors:', e);
            this.verseColors = {};
        }
    }

    saveVerseColors() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.verseColors));
        } catch (e) {
            console.error('Error saving verse colors:', e);
        }
    }

    getVerseKey(bookIndex, chapterIndex, verseIndex) {
        return `${bookIndex}-${chapterIndex}-${verseIndex}`;
    }

    getVerseColor(bookIndex, chapterIndex, verseIndex) {
        const key = this.getVerseKey(bookIndex, chapterIndex, verseIndex);
        return this.verseColors[key] || null;
    }

    setVerseColor(bookIndex, chapterIndex, verseIndex, color) {
        const key = this.getVerseKey(bookIndex, chapterIndex, verseIndex);
        if (color === 'none' || !color) {
            delete this.verseColors[key];
        } else {
            this.verseColors[key] = color;
        }
        this.saveVerseColors();
    }
    
    // ============================================
    // THEME METHODS
    // ============================================
    
    
    
    getTheme() {
        return localStorage.getItem(THEME.STORAGE_KEY) || THEME.DARK;
    }
    
    setTheme(theme) {
        localStorage.setItem(THEME.STORAGE_KEY, theme);
        this.applyTheme(theme);
    }
    
    applyTheme(theme) {
        if (theme === THEME.LIGHT) {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
        
        // ⭐ ADD THIS: Update language icon based on theme
        const langIcon = document.getElementById('lang-icon');
        if (langIcon) {
            if (theme === THEME.LIGHT) {
                langIcon.src = '../../asset/images/ethicallaw/lang-icon-white.png';
            } else {
                langIcon.src = '../../asset/images/ethicallaw/lang-icon-black.png';
            }
        }
        
        // ⭐ మ్యాఖ్యం: Theme change అయిన తరువాత current view refresh చేయి
        // ఇలా చేస్తే highlights మళ్లీ apply అవుతాయి
        if (window.app && window.app.uiRenderer && window.app.navState.currentChapter >= 0) {
            // Current chapter మళ్లీ render చేయి (highlights preserve అవుతాయి)
            window.app.uiRenderer.showVerseContent(window.app.navState.currentVerse);
        }
    }
    
    

    // ============================================
    // ZOOM METHODS
    // ============================================
    
    loadZoomLevel() {
        try {
            const saved = localStorage.getItem(ZOOM.STORAGE_KEY);
            return saved ? parseFloat(saved) : ZOOM.DEFAULT;
        } catch (e) {
            console.error('Error loading zoom level:', e);
            return ZOOM.DEFAULT;
        }
    }

    saveZoomLevel(level) {
        try {
            localStorage.setItem(ZOOM.STORAGE_KEY, level.toString());
            this.currentZoom = level;
        } catch (e) {
            console.error('Error saving zoom level:', e);
        }
    }

    zoomIn() {
        const newZoom = Math.min(this.currentZoom + ZOOM.STEP, ZOOM.MAX_SCALE);
        this.applyZoom(newZoom);
        return Math.round(newZoom * 100); // Return percentage
    }

    zoomOut() {
        const newZoom = Math.max(this.currentZoom - ZOOM.STEP, ZOOM.MIN_SCALE);
        this.applyZoom(newZoom);
        return Math.round(newZoom * 100);
    }

    resetZoom() {
        this.applyZoom(ZOOM.DEFAULT);
        return 100;
    }

    applyZoom(level) {
        const content = document.getElementById('content');
        if (content) {
            content.style.fontSize = `${level}em`;
        }
        this.currentZoom = level;
        this.saveZoomLevel(level);
    }
    
    getCurrentZoom() {
        return Math.round(this.currentZoom * 100);
    }
        
    // ============================================
    // LANGUAGE METHODS
    // ============================================

    getLanguage() {
        const saved = localStorage.getItem(LANGUAGE.STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);  // ✅ Parse array: ['telugu'] or ['telugu', 'english']
            } catch {
                return [LANGUAGE.DEFAULT];
            }
        }
        return [LANGUAGE.DEFAULT];
    }
    
    setLanguage(languages) {
        // ✅ Save as array
        localStorage.setItem(LANGUAGE.STORAGE_KEY, JSON.stringify(languages));
    }
}