function validateColors(theme) {
    // Required base colors
    const requiredColors = [
        'BACKGROUND',
        'FOREGROUND',
        'LINE_NUMBERS_COLOR',
        'SELECTION_BACKGROUND',
        'CARET_ROW_COLOR',
        'GUTTER_BACKGROUND'
    ];
    
    const hasRequiredColors = requiredColors.every(color => 
        theme.colors && theme.colors[color]
    );
    
    // Required syntax highlighting colors
    const syntaxColors = [
        'DEFAULT_KEYWORD',
        'DEFAULT_STRING',
        'DEFAULT_NUMBER',
        'DEFAULT_COMMENT',
        'DEFAULT_FUNCTION_DECLARATION',
        'DEFAULT_CLASS_NAME',
        'DEFAULT_CONSTANT',
        'DEFAULT_PARAMETER'
    ];
    
    const hasSyntaxColors = syntaxColors.every(color => 
        theme.attributes && theme.attributes[color]
    );
    
    return {
        isValid: hasRequiredColors && hasSyntaxColors,
        missingRequired: requiredColors.filter(color => 
            !theme.colors || !theme.colors[color]
        ),
        missingSyntax: syntaxColors.filter(color => 
            !theme.attributes || !theme.attributes[color]
        )
    };
}

function validateContrast(background, foreground) {
    // Remove the '#' if present
    background = background.replace('#', '');
    foreground = foreground.replace('#', '');
    
    // Convert hex to RGB
    const bg = hexToRGB(background);
    const fg = hexToRGB(foreground);
    
    // Calculate relative luminance
    const l1 = getLuminance(bg);
    const l2 = getLuminance(fg);
    
    // Calculate contrast ratio
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

function hexToRGB(hex) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

function getLuminance({ r, g, b }) {
    // Convert to sRGB
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;
    
    // Calculate luminance
    const rL = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const gL = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const bL = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
}

module.exports = {
    validateColors,
    validateContrast
};
