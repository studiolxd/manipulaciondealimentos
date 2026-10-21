// CSS of the design system: every visual value comes from a token, and
// components never use primitive tokens directly (they go through semantic
// or component tokens).

/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-declaration-strict-value'],
  ignoreFiles: ['src/design-system/generated/**', 'dist/**', 'storybook-static/**'],
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color-mix'],
    'declaration-property-value-disallowed-list': [
      {
        '/.*/': ['/var\\(--slxd-primitive-/'],
      },
      { message: 'Components must use semantic or component tokens, never --slxd-primitive-* directly.' },
    ],
    'scale-unlimited/declaration-strict-value': [
      [
        '/color$/',
        'background',
        'background-color',
        'border-color',
        'outline-color',
        'fill',
        'stroke',
        'box-shadow',
        'z-index',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'border-radius',
        '/^padding/',
        '/^margin/',
        'gap',
        'row-gap',
        'column-gap',
        'transition-duration',
        'transition-timing-function',
        'animation-duration',
        'animation-timing-function',
        'outline-width',
        'outline-offset',
      ],
      {
        ignoreValues: ['0', 'none', 'auto', 'inherit', 'initial', 'unset', 'transparent', 'currentcolor', 'currentColor', '/^-1px$/'],
        expandShorthand: true,
        message: 'Use a design token (var(--slxd-…)) for "${property}" instead of "${value}".',
      },
    ],
  },
}
