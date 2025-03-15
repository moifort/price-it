import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook', 'storybook-dark-mode'],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  staticDirs: ['../public'],
}
export default config
