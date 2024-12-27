function validateColors(theme) {
    const requiredColors = [
        'BACKGROUND',
        'FOREGROUND',
        'LINE_NUMBERS_COLOR',
        'SELECTION_BACKGROUND'
    ];
    
    const hasRequiredColors = requiredColors.every(color => 
        theme.colors && theme.colors[color]
    );
    
    const syntaxColors = [
        'DEFAULT_KEYWORD',
        'DEFAULT_STRING',
        'DEFAULT_NUMBER',
        ['DEFAULT_COMMENT', 'DEFAULT_BLOCK_COMMENT', 'DEFAULT_LINE_COMMENT']
    ];
    
    const hasSyntaxColors = syntaxColors.every(color => {
        if (Array.isArray(color)) {
            // If any of the alternatives exist, it's valid
            return color.some(alt => 
                theme.attributes && theme.attributes[alt]
            );
        }
        return theme.attributes && theme.attributes[color];
    });
    
    return {
        isValid: hasRequiredColors && hasSyntaxColors,
        missingRequired: requiredColors.filter(color => 
            !theme.colors || !theme.colors[color]
        ),
        missingSyntax: syntaxColors.filter(color => {
            if (Array.isArray(color)) {
                return !color.some(alt => 
                    theme.attributes && theme.attributes[alt]
                );
            }
            return !theme.attributes || !theme.attributes[color];
        }).flat()
    };
}

function validateContrast(background, foreground) {
    // Convert hex to RGB
    const bg = hexToRGB(background);
    const fg = hexToRGB(foreground);
    
    // Calculate relative luminance
    const l1 = getLuminance(bg);
    const l2 = getLuminance(fg);
    
    // Calculate contrast ratio
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return ratio;
}

function hexToRGB(hex) {
    const cleanHex = hex.replace('#', '');
    return {
        r: parseInt(cleanHex.substr(0, 2), 16),
        g: parseInt(cleanHex.substr(2, 2), 16),
        b: parseInt(cleanHex.substr(4, 2), 16)
    };
}

function getLuminance({ r, g, b }) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

module.exports = {
    validateColors,
    validateContrast
};
