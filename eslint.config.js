// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/sort-lifecycle-methods': ['error'], // требует определения хуков в порядке их выполнения
            '@angular-eslint/component-max-inline-declarations': [
                // определяет количество строк для inline-стилей, шаблона и анимаций
                'error',
                {
                    template: 12,
                    styles: 24,
                    animations: 36,
                },
            ],
            '@angular-eslint/no-async-lifecycle-method': ['error'], // запрещает использовать асинхронные куки
            '@angular-eslint/consistent-component-styles': ['error', 'string'], // запрещает использовать массивы для стилей компоненты
            '@angular-eslint/prefer-standalone': ['error'], // требует, чтобы все компоненты, директивы и пайпы были типа standalone
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {
            '@angular-eslint/template/attributes-order': [ // порядок атрибутов
                'error',
                {
                    alphabetical: true,
                    order: [
                        "STRUCTURAL_DIRECTIVE",
                        "TEMPLATE_REFERENCE",
                        "ATTRIBUTE_BINDING",
                        "INPUT_BINDING",
                        "TWO_WAY_BINDING",
                        "OUTPUT_BINDING",
                    ]
                }
            ],
            '@angular-eslint/template/button-has-type': ['error'], // требует атрибут type у кнопок
            '@angular-eslint/template/no-any': ['error'], // запрещает использовать $any в шаблонах
            '@angular-eslint/template/no-inline-styles': ['error'], // запрещает inline-стили в шаблонах
        },
    },
);
