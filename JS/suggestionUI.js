// ============================================function getTransliterationSuggestions(partialInput, transli
// SUGGESTION UI - TELUGU TRANSLITERATION
// WITH ALTERNATIVE SUPPORT
// ============================================

/**
 * Telugu words dictionary for suggestions
 */
export const TELUGU_WORD_SUGGESTIONS = [
    // Biblical & Common Words
    { english: 'prema', telugu: 'ప్రేమ', meaning: 'love' },
    { english: 'yesu', telugu: 'యేసు', meaning: 'Jesus' },
    { english: 'kristhu', telugu: 'క్రీస్తు', meaning: 'Christ' },
    { english: 'devudu', telugu: 'దేవుడు', meaning: 'God' },
    { english: 'prabhu', telugu: 'ప్రభు', meaning: 'Lord' },
    { english: 'daivam', telugu: 'దైవం', meaning: 'divine' },
    { english: 'lokam', telugu: 'లోకం', meaning: 'world' },
    { english: 'swargam', telugu: 'స్వర్గం', meaning: 'heaven' },
    { english: 'paapam', telugu: 'పాపం', meaning: 'sin' },
    { english: 'rakshana', telugu: 'రక్షణ', meaning: 'salvation' },
    { english: 'vishwasam', telugu: 'విశ్వాసం', meaning: 'faith' },
    { english: 'praarthana', telugu: 'ప్రార్థన', meaning: 'prayer' },
    { english: 'aaradhana', telugu: 'ఆరాధన', meaning: 'worship' },
    { english: 'krupa', telugu: 'కృప', meaning: 'grace' },
    { english: 'sathyam', telugu: 'సత్యం', meaning: 'truth' },
    { english: 'jeevitam', telugu: 'జీవితం', meaning: 'life' },
    { english: 'maranam', telugu: 'మరణం', meaning: 'death' },
    { english: 'shanti', telugu: 'శాంతి', meaning: 'peace' },
    { english: 'daya', telugu: 'దయ', meaning: 'mercy' },
    { english: 'mahima', telugu: 'మహిమ', meaning: 'glory' },
    { english: 'shakthi', telugu: 'శక్తి', meaning: 'power' },
    { english: 'vakyam', telugu: 'వాక్యం', meaning: 'word' },
    { english: 'pravakta', telugu: 'ప్రవక్త', meaning: 'prophet' },
    { english: 'apostalludu', telugu: 'అపొస్తలుడు', meaning: 'apostle' },
    { english: 'shishyudu', telugu: 'శిష్యుడు', meaning: 'disciple' },
    { english: 'devadootha', telugu: 'దేవదూత', meaning: 'angel' },
    { english: 'saathanu', telugu: 'సాతాను', meaning: 'satan' },
    { english: 'neethi', telugu: 'నీతి', meaning: 'righteousness' },
    { english: 'nyayam', telugu: 'న్యాయం', meaning: 'justice' },
    { english: 'aseervaadam', telugu: 'ఆశీర్వాదం', meaning: 'blessing' },
    { english: 'vaagdaanam', telugu: 'వాగ్దానం', meaning: 'promise' },
    { english: 'dharmashastram', telugu: 'ధర్మశాస్త్రం', meaning: 'law' },
    { english: 'devaalayam', telugu: 'దేవాలయం', meaning: 'temple' },
    { english: 'bali', telugu: 'బలి', meaning: 'sacrifice' },
    { english: 'raktham', telugu: 'రక్తం', meaning: 'blood' },
    { english: 'shiluva', telugu: 'శిలువ', meaning: 'cross' },
    { english: 'punarutthanam', telugu: 'పునరుత్థానం', meaning: 'resurrection' },
    { english: 'nityamaina', telugu: 'నిత్యమైన', meaning: 'eternal' },
    { english: 'hrudayam', telugu: 'హృదయం', meaning: 'heart' },
    { english: 'aathma', telugu: 'ఆత్మ', meaning: 'spirit/soul' },
    { english: 'manassu', telugu: 'మనస్సు', meaning: 'mind' },
    { english: 'santoosham', telugu: 'సంతోషం', meaning: 'joy' },
    { english: 'anandam', telugu: 'ఆనందం', meaning: 'happiness' },
    { english: 'baadha', telugu: 'బాధ', meaning: 'suffering' },
    { english: 'vedana', telugu: 'వేదన', meaning: 'pain' },
    { english: 'kshaminchadam', telugu: 'క్షమించడం', meaning: 'forgiveness' },
    { english: 'pashchaathapam', telugu: 'పశ్చాత్తాపం', meaning: 'repentance' },
    
    // People & Relations
    { english: 'manishi', telugu: 'మనిషి', meaning: 'man' },
    { english: 'sthree', telugu: 'స్త్రీ', meaning: 'woman' },
    { english: 'pillavadu', telugu: 'పిల్లవాడు', meaning: 'child' },
    { english: 'prajalu', telugu: 'ప్రజలు', meaning: 'people' },
    { english: 'raaju', telugu: 'రాజు', meaning: 'king' },
    { english: 'sahodarudu', telugu: 'సహోదరుడు', meaning: 'brother' },
    { english: 'sahodari', telugu: 'సహోదరి', meaning: 'sister' },
    { english: 'thandri', telugu: 'తండ్రి', meaning: 'father' },
    { english: 'thalli', telugu: 'తల్లి', meaning: 'mother' },
    { english: 'bharta', telugu: 'భర్త', meaning: 'husband' },
    { english: 'bhaarya', telugu: 'భార్య', meaning: 'wife' },
    
    // Actions
    { english: 'raa', telugu: 'రా', meaning: 'come' },
    { english: 'vellu', telugu: 'వెళ్ళు', meaning: 'go' },
    { english: 'chuudu', telugu: 'చూడు', meaning: 'see' },
    { english: 'vinandi', telugu: 'వినండి', meaning: 'hear' },
    { english: 'cheppu', telugu: 'చెప్పు', meaning: 'say' },
    { english: 'ivvandi', telugu: 'ఇవ్వండి', meaning: 'give' },
    { english: 'teesuko', telugu: 'తీసుకో', meaning: 'take' },
    { english: 'cheyandi', telugu: 'చేయండి', meaning: 'do' },
    
    // Nature & Places
    { english: 'samudram', telugu: 'సముద్రం', meaning: 'sea' },
    { english: 'neeru', telugu: 'నీరు', meaning: 'water' },
    { english: 'agni', telugu: 'అగ్ని', meaning: 'fire' },
    { english: 'gaali', telugu: 'గాలి', meaning: 'wind' },
    { english: 'konda', telugu: 'కొండ', meaning: 'mountain' },
    { english: 'nadi', telugu: 'నది', meaning: 'river' },
    { english: 'nagaram', telugu: 'నగరం', meaning: 'city' },
    { english: 'illu', telugu: 'ఇల్లు', meaning: 'house' },
    { english: 'dwaaram', telugu: 'ద్వారం', meaning: 'door' },
    { english: 'maargam', telugu: 'మార్గం', meaning: 'path' },
    { english: 'chettu', telugu: 'చెట్టు', meaning: 'tree' },
    { english: 'pandu', telugu: 'పండు', meaning: 'fruit' },
    { english: 'velugu', telugu: 'వెలుగు', meaning: 'light' },
    { english: 'cheekati', telugu: 'చీకటి', meaning: 'darkness' },
    { english: 'nakshathram', telugu: 'నక్షత్రం', meaning: 'star' },
    { english: 'sooryudu', telugu: 'సూర్యుడు', meaning: 'sun' },
    { english: 'chandrudu', telugu: 'చంద్రుడు', meaning: 'moon' }
];

/**
 * ⭐ NEW: Mapping for characters with multiple Telugu alternatives
 */
const TELUGU_ALTERNATIVES = {
    'na': [
        { char: 'న', desc: 'dental' },
        { char: 'ణ', desc: 'retroflex' }
    ],
    'ta': [
        { char: 'త', desc: 'dental' },
        { char: 'ట', desc: 'retroflex' }
    ],
    'da': [
        { char: 'ద', desc: 'dental' },
        { char: 'డ', desc: 'retroflex' }
    ],
    'sa': [
        { char: 'స', desc: 'sa' },
        { char: 'శ', desc: 'sha' },
        { char: 'ష', desc: 'retroflex sha' }
    ],
    'la': [
        { char: 'ల', desc: 'la' },
        { char: 'ళ', desc: 'retroflex' }
    ],
    'ra': [
        { char: 'ర', desc: 'ra' },
        { char: 'ఱ', desc: 'trilled' }
    ]
};

/**
 * ⭐ NEW: Generate all alternatives for a word
 */
function generateAlternatives(text, transliterateFunc) {
    if (!text || !transliterateFunc) return [];
    
    const input = text.toLowerCase();
    const positions = [];
    
    // Find all positions with alternatives
    for (const [roman, alts] of Object.entries(TELUGU_ALTERNATIVES)) {
        let pos = 0;
        while ((pos = input.indexOf(roman, pos)) !== -1) {
            positions.push({ pos, len: roman.length, alts });
            pos += 1;
        }
    }
    
    if (positions.length === 0) {
        const result = transliterateFunc(text);
        return result !== text ? [{ telugu: result, type: 'standard' }] : [];
    }
    
    // Remove overlapping
    positions.sort((a, b) => a.pos - b.pos);
    const filtered = [];
    let lastEnd = -1;
    
    for (const p of positions) {
        if (p.pos >= lastEnd) {
            filtered.push(p);
            lastEnd = p.pos + p.len;
        }
    }
    
    // Generate combinations
    const results = new Set();
    
    function generate(idx, current) {
        if (idx >= filtered.length) {
            const telugu = transliterateFunc(current);
            if (telugu !== current) results.add(telugu);
            return;
        }
        
        const p = filtered[idx];
        const before = current.substring(0, p.pos);
        const after = current.substring(p.pos + p.len);
        
        for (const alt of p.alts) {
            generate(idx + 1, before + alt.char + after);
        }
    }
    
    generate(0, input);
    
    return Array.from(results).map(t => ({ telugu: t, type: 'alternative' }));
}

/**
 * ⭐ UPDATED: Get suggestions with alternatives
 */

function getTransliterationSuggestions(partialInput, transliterateFunc) {
    if (!partialInput || partialInput.length < 2) return [];
    
    const input = partialInput.toLowerCase().trim();
    const suggestions = [];
    
    // ⭐ NEW: Smart transliteration with context-aware 'm' conversion
    const smartTransliterate = (text) => {
        if (!transliterateFunc) return text;
        
        let result = '';
        let i = 0;
        
        while (i < text.length) {
            const char = text[i];
            const nextChar = text[i + 1];
            
            // ✅ If 'm' followed by consonant or end → ం (anusvara)
            if (char === 'm' || char === 'n') {
                if (!nextChar || !/[aeiou]/.test(nextChar)) {
                    result += 'ం';
                    i++;
                    continue;
                }
            }
            
            result += char;
            i++;
        }
        
        return transliterateFunc(result);
    };
    
    // 1. Dictionary matches
    for (const word of TELUGU_WORD_SUGGESTIONS) {
        if (word.english.startsWith(input)) {
            suggestions.push({
                english: word.english,
                telugu: word.telugu,
                meaning: word.meaning,
                matchType: 'dictionary',
                score: word.english.length - input.length
            });
        }
    }
    
    // 2. Add alternatives for exact dictionary match
    const exactMatch = TELUGU_WORD_SUGGESTIONS.find(w => w.english === input);
    if (exactMatch && transliterateFunc) {
        const alts = generateAlternatives(input, smartTransliterate);
        
        alts.forEach(alt => {
            if (alt.telugu !== exactMatch.telugu) {
                suggestions.push({
                    english: input,
                    telugu: alt.telugu,
                    meaning: 'alternative',
                    matchType: 'alternative',
                    score: 50
                });
            }
        });
    }
    
    // 3. Contains matches (if few results)
    if (suggestions.length < 5) {
        for (const word of TELUGU_WORD_SUGGESTIONS) {
            if (!word.english.startsWith(input) && word.english.includes(input)) {
                suggestions.push({
                    english: word.english,
                    telugu: word.telugu,
                    meaning: word.meaning,
                    matchType: 'contains',
                    score: 100 + word.english.indexOf(input)
                });
            }
        }
    }
    
    // 4. If no matches, show auto-transliteration + alternatives with smart 'm'
    if (suggestions.length === 0 && transliterateFunc) {
        const alts = generateAlternatives(input, smartTransliterate);
        
        if (alts.length > 0) {
            alts.forEach((alt, idx) => {
                suggestions.push({
                    english: input,
                    telugu: alt.telugu,
                    meaning: idx === 0 ? '' : 'alternative',
                    matchType: 'auto',
                    score: 200 + idx
                });
            });
        } else {
            const basic = smartTransliterate(input);
            if (basic !== input) {
                suggestions.push({
                    english: input,
                    telugu: basic,
                    meaning: '',
                    matchType: 'auto',
                    score: 999
                });
            }
        }
    }
    
    return suggestions.sort((a, b) => a.score - b.score).slice(0, 8);
}

/**
 * ⭐ UPDATED: SuggestionUI class
 */
export class SuggestionUI {
    constructor() {
        this.suggestionsDiv = null;
        this.selectedIndex = -1;
        this.currentSuggestions = [];
        this.isVisible = false;
    }
    
    createSuggestionsContainer() {
        if (this.suggestionsDiv) return;
        
        this.suggestionsDiv = document.createElement('div');
        this.suggestionsDiv.id = 'transliteration-suggestions';
        this.suggestionsDiv.className = 'suggestion-container';
        
        this.suggestionsDiv.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 90px;
            background: #2a2a2a;
            border: 1px solid #444;
            border-radius: 8px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 1001;
            display: none;
            margin-top: 5px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        `;
        
        const searchContainer = document.getElementById('search-container');
        if (searchContainer) {
            searchContainer.appendChild(this.suggestionsDiv);
        }
    }

    showSuggestions(englishInput, onSelect, translitModule = null) {
        if (!this.suggestionsDiv) {
            this.createSuggestionsContainer();
        }
        
        // ⭐ Use enhanced suggestions
        const translitFunc = translitModule?.transliterateToTelugu;
        const allSuggestions = getTransliterationSuggestions(englishInput, translitFunc);
        
        this.currentSuggestions = allSuggestions;
        this.selectedIndex = -1;
        
        if (!allSuggestions || allSuggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.suggestionsDiv.innerHTML = '';
        
        allSuggestions.forEach((suggestion, index) => {
            const item = this.createSuggestionItem(suggestion, index, onSelect);
            this.suggestionsDiv.appendChild(item);
        });
        
        this.suggestionsDiv.style.display = 'block';
        this.isVisible = true;
    }
    
    createSuggestionItem(suggestion, index, onSelect) {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.dataset.index = index;
        
        const isAlt = suggestion.matchType === 'alternative';
        
        item.style.cssText = `
            padding: 12px 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid #333;
            display: flex;
            flex-direction: column;
            gap: 4px;
            ${isAlt ? 'background: rgba(255, 152, 0, 0.05);' : ''}
        `;
        
        // Telugu text
        const teluguSpan = document.createElement('div');
        teluguSpan.style.cssText = `
            font-size: 18px;
            font-weight: bold;
            color: ${isAlt ? '#ff9800' : '#4da8ff'};
        `;
        teluguSpan.textContent = suggestion.telugu;
        item.appendChild(teluguSpan);
        
        // Meaning/label
        if (suggestion.meaning) {
            const meaningSpan = document.createElement('div');
            meaningSpan.style.cssText = `
                font-size: 12px;
                color: ${isAlt ? '#ff9800' : '#666'};
                font-style: italic;
            `;
            meaningSpan.textContent = suggestion.meaning;
            item.appendChild(meaningSpan);
        }
        
        item.addEventListener('mouseenter', () => {
            this.highlightSuggestion(index);
        });
        
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            onSelect(suggestion);
            this.hideSuggestions();
        });
        
        return item;
    }
    
    highlightSuggestion(index) {
        const items = this.suggestionsDiv.querySelectorAll('.suggestion-item');
        
        items.forEach((item, i) => {
            if (i === index) {
                const isLightMode = document.documentElement.classList.contains('light-mode');
                item.style.background = isLightMode 
                    ? 'rgba(30, 64, 175, 0.1)' 
                    : 'rgba(77, 168, 255, 0.2)';
                this.selectedIndex = index;
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                const isAlt = item.querySelector('div').style.color === 'rgb(255, 152, 0)';
                item.style.background = isAlt ? 'rgba(255, 152, 0, 0.05)' : 'transparent';
            }
        });
    }
    
    navigateSuggestions(direction) {
        if (!this.isVisible || this.currentSuggestions.length === 0) return null;
        
        if (direction === 'down') {
            this.selectedIndex = Math.min(this.selectedIndex + 1, this.currentSuggestions.length - 1);
        } else if (direction === 'up') {
            this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        }
        
        if (this.selectedIndex >= 0) {
            this.highlightSuggestion(this.selectedIndex);
        }
        
        return this.selectedIndex >= 0 ? this.currentSuggestions[this.selectedIndex] : null;
    }
    
    getSelectedSuggestion() {
        return this.selectedIndex >= 0 ? this.currentSuggestions[this.selectedIndex] : null;
    }
    
    hideSuggestions() {
        if (this.suggestionsDiv) {
            this.suggestionsDiv.style.display = 'none';
            this.isVisible = false;
            this.currentSuggestions = [];
            this.selectedIndex = -1;
        }
    }
    
    isOpen() {
        return this.isVisible;
    }
    
    updateTheme(isLightMode) {
        if (!this.suggestionsDiv) return;
        
        if (isLightMode) {
            this.suggestionsDiv.style.background = '#ffffff';
            this.suggestionsDiv.style.borderColor = '#e2e8f0';
            this.suggestionsDiv.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
        } else {
            this.suggestionsDiv.style.background = '#2a2a2a';
            this.suggestionsDiv.style.borderColor = '#444';
            this.suggestionsDiv.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
        }
        
        const items = this.suggestionsDiv.querySelectorAll('.suggestion-item');
        items.forEach(item => {
            if (isLightMode) {
                item.style.borderBottomColor = '#f1f5f9';
            } else {
                item.style.borderBottomColor = '#333';
            }
        });
    }
}

export function applyLightModeSuggestions() {
    const style = document.createElement('style');
    style.id = 'suggestion-light-mode-styles';
    style.textContent = `
        html.light-mode #transliteration-suggestions {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
        }
        
        html.light-mode .suggestion-item {
            border-bottom: 1px solid #f1f5f9 !important;
        }
        
        html.light-mode .suggestion-item:hover {
            background: rgba(30, 64, 175, 0.08) !important;
        }
        
        html.light-mode .suggestion-item div:first-child {
            color: #1e40af !important;
        }
        
        html.light-mode .suggestion-item div:not(:first-child) {
            color: #64748b !important;
        }
    `;
    
    if (!document.getElementById('suggestion-light-mode-styles')) {
        document.head.appendChild(style);
    }
}