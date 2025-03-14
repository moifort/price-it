import type { Preview } from '@storybook/vue3'
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize()

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['atoms', ['Index', '*'], 'molecules', 'organisms', 'templates', 'pages', 'recipes', '*'],
      },
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  tags: ['autodocs'],
  loaders: [mswLoader],
}

export default preview
