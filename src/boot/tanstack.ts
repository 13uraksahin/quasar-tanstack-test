import { boot } from 'quasar/wrappers'
import { QueryClient, VueQueryPlugin, hydrate, dehydrate } from '@tanstack/vue-query'

export default boot(({ app, ssrContext }) => {
  const queryClient = new QueryClient()

  if (process.env.SERVER) {
    // Indicate how to access and serialize VueQuery state during SSR
    initialState.vueQueryState = { toJSON: () => dehydrate(queryClient) }
  } else {
    // Reuse the existing state in the browser
    hydrate(queryClient, initialState.vueQueryState)
  }

  app.use(VueQueryPlugin, { queryClient })
})
