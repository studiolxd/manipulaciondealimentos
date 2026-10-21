import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../src/design-system/**/*.mdx', '../src/design-system/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      // Markdown tables in the documentation pages.
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } },
    },
  ],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  // Placeholder PNGs and icons live in public/.
  staticDirs: ['../public'],
}

export default config
