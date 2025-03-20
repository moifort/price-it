import type { App, Component } from 'vue'
import { createVNode, render } from 'vue'

declare module '#app' {
  interface NuxtApp {
    $open: <T = unknown>(component: Component, props?: Record<string, unknown>, slot?: unknown) => Promise<T>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $open: <T = unknown>(component: Component, props?: Record<string, unknown>, slot?: unknown) => Promise<T>
  }
}

export default defineNuxtPlugin(({ vueApp, provide }) => {
  const $open =
    (app: App<Element>) => async (component: Component, props?: Record<string, unknown>, slot?: unknown) => {
      let el: HTMLElement | null = null
      const result = await new Promise((resolve) => {
        const vNode: VNode | null = createVNode(
          component,
          {
            ...props,
            close: (returnValue: unknown) => {
              resolve(returnValue)
            },
          },
          slot,
        )
        vNode.appContext = app._context
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        // biome-ignore  lint/style/noNonNullAssertion: <explanation>
        render(vNode, (el = document.querySelector('#main-application')!))
      })
      // biome-ignore  lint/style/noNonNullAssertion: <explanation>
      setTimeout(() => render(null, el!), 300)
      return result
    }
  provide('open', $open(vueApp))
})
