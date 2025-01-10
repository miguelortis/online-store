import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default [
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),

  {
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          //allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'error', // Añade esta línea
    },
  },
  {
    extends: [
      'plugin:prettier/recommended', // Añade esta línea
    ],
  },
];