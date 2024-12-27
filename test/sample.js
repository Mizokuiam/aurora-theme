class ThemeManager {
    /**
     * Manages theme loading and application with support for variants
     * @param {string} defaultTheme - The default theme to use
     * @param {string[]} variants - List of available theme variants
     */
    constructor(defaultTheme = 'aurora-default', variants = []) {
        this.currentTheme = defaultTheme;
        this.variants = new Set(variants);
        this.listeners = new Map();
        this._initialized = false;
    }

    /**
     * Initialize the theme manager
     * @returns {Promise<void>}
     */
    async initialize() {
        try {
            await this.loadPreferences();
            await this.applyCurrentTheme();
            this._initialized = true;
            this.notifyListeners('init');
        } catch (error) {
            console.error('Failed to initialize theme manager:', error);
            throw error;
        }
    }

    /**
     * Switch to a different theme variant
     * @param {string} variant - The theme variant to switch to
     * @returns {Promise<void>}
     */
    async switchTheme(variant) {
        if (!this.variants.has(variant)) {
            throw new Error(`Unknown theme variant: ${variant}`);
        }

        try {
            const theme = await this.loadTheme(variant);
            await this.applyTheme(theme);
            this.currentTheme = variant;
            this.notifyListeners('change', { theme: variant });
        } catch (error) {
            console.error(`Failed to switch to theme ${variant}:`, error);
            throw error;
        }
    }

    /**
     * Add a theme change listener
     * @param {string} event - Event to listen for ('init' or 'change')
     * @param {Function} callback - Callback function
     * @returns {string} Listener ID
     */
    addListener(event, callback) {
        const id = Math.random().toString(36).substr(2, 9);
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Map());
        }
        this.listeners.get(event).set(id, callback);
        return id;
    }

    /**
     * Remove a theme change listener
     * @param {string} event - Event type
     * @param {string} id - Listener ID
     */
    removeListener(event, id) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).delete(id);
        }
    }

    // Private methods
    
    async loadPreferences() {
        // Implementation for loading user preferences
        return {
            theme: this.currentTheme,
            customizations: {}
        };
    }

    async loadTheme(variant) {
        // Implementation for loading theme data
        return {
            name: variant,
            colors: {},
            rules: []
        };
    }

    async applyTheme(theme) {
        // Implementation for applying theme to the UI
        document.body.dataset.theme = theme.name;
    }

    notifyListeners(event, data = {}) {
        if (this.listeners.has(event)) {
            for (const callback of this.listeners.get(event).values()) {
                callback(data);
            }
        }
    }
}
