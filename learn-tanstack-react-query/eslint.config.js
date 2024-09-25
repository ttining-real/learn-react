import reactRefresh from 'eslint-plugin-react-refresh';
import reactQuery from '@tanstack/eslint-plugin-query';
import reactHooks from 'eslint-plugin-react-hooks';
import reactJsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import js from '@eslint/js';

export default tseslint.config(
  { ignores: ['dist', '.vscode', './src/styles.css'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': reactQuery,
      'jsx-a11y': reactJsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactJsxA11y.flatConfigs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['loader', 'action'],
        },
      ],
    },
  }
);
