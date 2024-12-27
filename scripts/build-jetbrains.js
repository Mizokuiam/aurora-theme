const fs = require('fs-extra');
const path = require('path');

async function buildJetBrainsTheme(colors, variant = 'default') {
    const distDir = path.join(__dirname, '../dist/jetbrains');
    await fs.ensureDir(distDir);

    const themeContent = `<?xml version="1.0" encoding="UTF-8"?>
<scheme name="Aurora ${variant.charAt(0).toUpperCase() + variant.slice(1)}" version="1" parent_scheme="Darcula">
    <colors>
        <option name="BACKGROUND" value="${colors.background}"/>
        <option name="FOREGROUND" value="${colors.foreground}"/>
        <option name="SELECTION_BACKGROUND" value="${colors.selection}"/>
        <option name="CARET_ROW_COLOR" value="${colors.activeLine}"/>
        <option name="GUTTER_BACKGROUND" value="${colors.background}"/>
        <option name="LINE_NUMBERS_COLOR" value="${colors.foreground}"/>
    </colors>
    <attributes>
        <option name="TEXT">
            <value>
                <option name="FOREGROUND" value="${colors.foreground}"/>
            </value>
        </option>
        <option name="DEFAULT_KEYWORD">
            <value>
                <option name="FOREGROUND" value="${colors.keyword}"/>
                <option name="FONT_TYPE" value="1"/>
            </value>
        </option>
        <option name="DEFAULT_STRING">
            <value>
                <option name="FOREGROUND" value="${colors.string}"/>
            </value>
        </option>
        <option name="DEFAULT_NUMBER">
            <value>
                <option name="FOREGROUND" value="${colors.number}"/>
            </value>
        </option>
        <option name="DEFAULT_COMMENT">
            <value>
                <option name="FOREGROUND" value="${colors.comment}"/>
                <option name="FONT_TYPE" value="2"/>
            </value>
        </option>
        <option name="DEFAULT_FUNCTION_DECLARATION">
            <value>
                <option name="FOREGROUND" value="${colors.function}"/>
            </value>
        </option>
        <option name="DEFAULT_CLASS_NAME">
            <value>
                <option name="FOREGROUND" value="${colors.class}"/>
            </value>
        </option>
        <option name="DEFAULT_CONSTANT">
            <value>
                <option name="FOREGROUND" value="${colors.constant}"/>
            </value>
        </option>
        <option name="DEFAULT_VARIABLE">
            <value>
                <option name="FOREGROUND" value="${colors.variable}"/>
            </value>
        </option>
    </attributes>
</scheme>`;

    await fs.writeFile(
        path.join(distDir, `Aurora-${variant}.xml`),
        themeContent
    );

    // Create META-INF directory and plugin.xml
    const metaInfDir = path.join(distDir, 'META-INF');
    await fs.ensureDir(metaInfDir);

    const pluginXml = `<?xml version="1.0" encoding="UTF-8"?>
<idea-plugin>
    <id>com.aurora-theme.${variant}</id>
    <name>Aurora Theme - ${variant.charAt(0).toUpperCase() + variant.slice(1)}</name>
    <version>1.0.0</version>
    <vendor>Aurora Theme</vendor>
    <description>A beautiful dark theme for JetBrains IDEs</description>
    <idea-version since-build="193.0"/>
    <depends>com.intellij.modules.platform</depends>
</idea-plugin>`;

    await fs.writeFile(path.join(metaInfDir, 'plugin.xml'), pluginXml);

    console.log(`JetBrains theme package built for variant: ${variant}`);
}

module.exports = buildJetBrainsTheme;
