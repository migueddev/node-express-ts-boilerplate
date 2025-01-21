import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier'; // Plugin de Prettier
import parser from '@typescript-eslint/parser'; // Importamos el parser correctamente

/** @type {import('eslint').Linter.Config[]} */

export default [
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.{js,ts}'], // Archivos JS y TS
  },
  {
    languageOptions: {
      globals: globals.node, // Entorno de Node.js
      parser: parser, // Usamos el parser de TypeScript
    },
  },
  {
    plugins: {
      '@typescript-eslint': tseslint, // Definimos el plugin TypeScript
      'prettier': eslintPluginPrettier, // Definimos el plugin Prettier
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Reglas recomendadas de TypeScript
      'prettier/prettier': [
        'error',
        { singleQuote: true, trailingComma: 'all' },
      ], // Reglas de Prettier
    },
  },
  pluginJs.configs.recommended, // Reglas recomendadas de ESLint para JS
  eslintConfigPrettier, // Reglas para integrar con Prettier
];
