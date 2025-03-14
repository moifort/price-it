import type { Preview } from '@storybook/vue3'

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
}

export default preview
