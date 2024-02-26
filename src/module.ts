import { name, version } from '../package.json'
import { defu } from 'defu'
import { addRouteMiddleware, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  domainUrl?: string
  devRedirect?: boolean
  trailingSlash?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'sgxRedirects'
  },
  defaults: {
    domainUrl: undefined,
    devRedirect: false,
    trailingSlash: undefined
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.build.transpile.push(resolve('runtime'))

    nuxt.options.appConfig.sgxRedirects = defu(
      nuxt.options.appConfig.sgxRedirects,
      options
    )

    addRouteMiddleware({
      name: 'sgx-domain-url-redirect',
      path: resolve('runtime/middleware/domain-url-redirect'),
      global: true
    })

    addRouteMiddleware({
      name: 'sgx-trailing-slash-redirect',
      path: resolve('runtime/middleware/trailing-slash-redirect'),
      global: true
    })
  }
})

declare module '@nuxt/schema' {
  interface AppConfig {
    sgxRedirects?: ModuleOptions
  }
  interface PublicRuntimeConfig {
    sgxRedirects?: ModuleOptions
  }
}
