/**
 * @type {import('prettier').Config}
 */
module.exports = {
    // https://prettier.io/docs/en/options
    //printWidth: 80, // 80, Specify the line length that the printer will wrap on.
    tabWidth: 4, // 2, Specify the number of spaces per indentation-level.
    //useTabs: false, // false, Indent lines with tabs instead of spaces.
    //semi: true, // true, Print semicolons at the ends of statements.
    singleQuote: true, // false, Use single quotes instead of double quotes.
    // trailingComma: 'all', // { }, vs { } Default value changed from es5 to all in v3.0.0, https://www.youtube.com/watch?v=u9nXJPkR63M
    // bracketSpacing: false, // false, {m1,m2} vs { m1,m2 } https://www.youtube.com/watch?v=j39_Fzsfuys
    arrowParens: 'avoid', // 'avoid', (err) => vs err => https://www.youtube.com/watch?v=4cymbf-cpQY
    // htmlWhitespaceSensitivity: 'ignore', 1</b> 2 </b> 3 => 1 2 3; 1</b>2</b>3 => 123;  https://www.youtube.com/watch?v=CzbUKK4OmrA

    // https://www.npmjs.com/package/prettier-plugin-organize-attributes
    plugins: [require.resolve('prettier-plugin-organize-attributes')],
    attributeGroups: ['^class$', '^(id|name)$', '$DEFAULT', '^data-', '^aria-'],
    // https://prettier.io/docs/en/configuration.html#configuration-overrides
    overrides: [
        // Overrides let you have different configuration for certain file extensions, folders and specific files.
        {
            files: ['*.html'],
            options: { parser: 'html' }, // https://prettier.io/docs/en/options.html#parser
        },
        {
            files: ['*.component.html', '*.template.html'],
            options: { parser: 'angular' },
        },
        {
            files: ['*.yaml'],
            options: { parser: 'yaml' },
        },
    ],
};
