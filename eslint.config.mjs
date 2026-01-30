import pluginJs from '@eslint/js';
import googleConfig from 'eslint-config-google';
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import checkFile from 'eslint-plugin-check-file';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.stylisticTypeChecked,
  googleConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      '@stylistic': stylistic,
      'check-file': checkFile,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'valid-jsdoc': 'off', // deprecated,
      'require-jsdoc': 'off', // deprecated
      'object-curly-spacing': 'off', // deprecated
      'max-len': 'off', // deprecated
      'operator-linebreak': ['error', 'before'],
      'no-empty-pattern': 'off',
      'space-before-blocks': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/max-len': [
        'error',
        {
          code: 150,
          ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        },
      ],
      '@stylistic/type-annotation-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/space-infix-ops': [
        'error',
        {
          int32Hint: false,
        }
      ],
      '@stylistic/type-annotation-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'enum',
            'interface',
            'type',
            'function',
            'export',
            'class',
            'for',
            'if',
            'try',
          ],
        },
      ],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  // Playwright ESlint config
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'off',
      'playwright/no-standalone-expect': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-conditional-expect': 'off',
      'playwright/no-force-option': 'off',
      'playwright/valid-test-tags': 'off',
    },
  },
  // Check file ESlint config
  {
    files: ['**/*'],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*': '([a-z])*([a-z0-9])*([A-Z]*([a-z0-9]))*(\\.[a-z]+)', // camelCase + dot case for file names
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'CAMEL_CASE',
        },
      ],
    },
  },
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules',
      '.schema',
      'test-report',
      'test-results',
    ],
  },
];