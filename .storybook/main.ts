import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/design-system/**/*.mdx', '../src/design-system/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  // Placeholder PNGs and icons live in public/.
  staticDirs: ['../public'],
}

export default config
