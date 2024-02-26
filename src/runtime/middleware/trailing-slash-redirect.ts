import { defu } from 'defu'
import { withTrailingSlash, withoutTrailingSlash } from 'ufo'
import {
  defineNuxtRouteMiddleware,
  navigateTo,
  useAppConfig,
  useRuntimeConfig,
  useError
} from '#imports'

export default defineNuxtRouteMiddleware((route) => {
  if (import.meta.prerender) return
  const error = useError()
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()
  const config = defu(runtimeConfig.public.sgxRedirects, appConfig.sgxRedirects)
  const { trailingSlash } = config

  let path = route.path

  if (trailingSlash !== undefined) {
    path = trailingSlash ? withTrailingSlash(path) : withoutTrailingSlash(path)
  }

  if (path != route.path && !error.value) {
    return navigateTo({ path, query: route.query }, { redirectCode: 301 })
  }
})
