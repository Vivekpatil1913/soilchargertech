import coreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...coreWebVitals,
  ...nextTypescript,

  {
    files: ['**/*.{ts,tsx}'],
    // NOTE: the jsx-a11y plugin is already registered by
    // eslint-config-next/core-web-vitals — re-registering it is a config error.
    // We only import the package here to pull in its `recommended` rule set.
    rules: {
      // --- Accessibility ---
      // These are errors, not warnings. The old site shipped 79 of 94 images
      // with empty alt text; that class of defect must not be able to merge.
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',

      // --- Type hygiene ---
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // --- Performance guardrails (Phase 10 budgets) ---
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
    },
  },

  {
    // The content layer is pure data — it must never reach for UI.
    files: ['src/data/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['@/components/*'] }],
    },
  },

  {
    // Enforces the CMS seam: components read through the repository, never
    // from @/data directly. This is what keeps the Sanity/Payload migration a
    // one-file change instead of a rewrite.
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/data/*'],
              message:
                'Components must not import from @/data directly. Go through @/lib/content/repository.',
            },
          ],
        },
      ],
    },
  },

  prettier,

  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
]

export default config
