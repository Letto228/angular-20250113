/**
 * @type {import('prettier').Config}
 */
module.exports = {
    printWidth: 80, // рекомендуемая длина строки - 80 символов
    tabWidth: 4,
    useTabs: false,
    embeddedLanguageFormatting: 'auto', // форматировать вставки кода (соблюдать переносы строк, отступы и т.п.)
    semi: true,
    singleQuote: true,
    trailingComma: 'es5', // не добавлять замыкающие запятые в типах, только в объектов, массивов и т.п.
    bracketSpacing: true, // добавлять отступы между фигурными скобками
    arrowParens: 'always', // добавлять скобки в стрелочных функциях с одним параметром
    htmlWhitespaceSensitivity: 'css', // удалять пробелы/переносы, если они могут повлиять на отображение
    proseWrap: 'always', // переносить строки в тексте
    singleAttributePerLine: true, // каждый атрибут тега на новой строке
    quoteProps: 'as-needed', // добавлять кавычки свойствам объектов по мере необходимости
    experimentalTernaries: true, // переносить строки во вложенных тернарных операторах
    bracketSameLine: false, // переносить закрывающую скобку тега на новую строку
    endOfLine: 'auto', // оставлять спецсимволы в конце строк без изменений
    plugins: [
        require.resolve('prettier-plugin-organize-attributes'),
        require.resolve('@prettier/plugin-xml'), // плагин для форматирования xml-файлов
    ],
    attributeGroups: [
        '$ANGULAR_STRUCTURAL_DIRECTIVE',
        '$ANGULAR_ELEMENT_REF',
        '$ID',
        '$DEFAULT',
        '$CLASS',
        '^\\[class\\.',
        '$ANGULAR_ANIMATION',
        '$ANGULAR_ANIMATION_INPUT',
        '$ANGULAR_INPUT',
        '$ANGULAR_TWO_WAY_BINDING',
        '$ANGULAR_OUTPUT',
    ],
    xmlQuoteAttributes: 'single', // использовать одинарные кавычки в xml-файлах
    xmlSelfClosingSpace: true, // добавлять пробел перед закрывающей скобкой одиночных тегов
    xmlSortAttributesByKey: true, // сначала xml-атрибуты, затем остальные в алфавитном порядке
    xmlWhitespaceSensitivity: 'strict', // оставлять все пробелы внутри xml-тегов
    overrides: [
        {
            files: ['*.html'],
            options: {parser: 'html'},
        },
        {
            files: ['*.component.html', '*.template.html'],
            options: {parser: 'angular'},
        },
        {
            files: ['*.md'],
            options: {proseWrap: 'never'}, // в REAMDE.md, CHANGELOG.md и подобных файлах не переносить строки
        },
    ],
};
