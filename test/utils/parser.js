const fs = require('fs-extra');
const xml2js = require('xml2js');
const plist = require('plist');

async function parseThemeFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const ext = filePath.split('.').pop().toLowerCase();
    
    switch (ext) {
        case 'xml':
            const result = await parseXML(content);
            return transformJetBrainsTheme(result);
        case 'tmtheme':
            return parsePlist(content);
        case 'less':
            return parseLess(content);
        case 'json':
            return JSON.parse(content);
        default:
            throw new Error(`Unsupported file format: ${ext}`);
    }
}

async function parseXML(content) {
    const parser = new xml2js.Parser({
        explicitArray: false,
        explicitRoot: true,
        mergeAttrs: true
    });
    return parser.parseStringPromise(content);
}

function transformJetBrainsTheme(xmlData) {
    if (!xmlData.scheme) return {};
    
    const colors = {};
    const attributes = {};
    
    // Parse colors
    if (xmlData.scheme.colors && xmlData.scheme.colors.option) {
        const options = Array.isArray(xmlData.scheme.colors.option) 
            ? xmlData.scheme.colors.option 
            : [xmlData.scheme.colors.option];
        
        options.forEach(option => {
            if (option.name && option.value) {
                colors[option.name] = option.value;
            }
        });
    }
    
    // Parse attributes
    if (xmlData.scheme.attributes && xmlData.scheme.attributes.option) {
        const options = Array.isArray(xmlData.scheme.attributes.option)
            ? xmlData.scheme.attributes.option
            : [xmlData.scheme.attributes.option];
        
        options.forEach(option => {
            if (option.name && option.value && option.value.option) {
                const valueOptions = Array.isArray(option.value.option)
                    ? option.value.option
                    : [option.value.option];
                
                const foreground = valueOptions.find(opt => opt.name === 'FOREGROUND');
                const fontType = valueOptions.find(opt => opt.name === 'FONT_TYPE');
                
                attributes[option.name] = {
                    foreground: foreground ? foreground.value : undefined,
                    fontType: fontType ? fontType.value : undefined
                };
            }
        });
    }
    
    return { colors, attributes };
}

function parsePlist(content) {
    return plist.parse(content);
}

function parseLess(content) {
    // Simple LESS parser for testing
    const variables = {};
    const rules = [];
    
    content.split('\n').forEach(line => {
        // Extract variables
        const varMatch = line.match(/@([a-zA-Z0-9-]+):\s*([^;]+);/);
        if (varMatch) {
            variables[varMatch[1]] = varMatch[2].trim();
        }
        
        // Extract rules
        const ruleMatch = line.match(/([.#][a-zA-Z0-9-_]+)\s*{/);
        if (ruleMatch) {
            rules.push(ruleMatch[1]);
        }
    });
    
    return { variables, rules };
}

module.exports = {
    parseThemeFile
};
