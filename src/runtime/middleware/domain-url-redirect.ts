import { defu } from 'defu'
import { withTrailingSlash, resolveURL } from 'ufo'
import {
  defineNuxtRouteMiddleware,
  navigateTo,
  useAppConfig,
  useRuntimeConfig,
  useRequestURL,
  useError
} from '#imports'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.prerender) return

  const error = useError()
  const request = useRequestURL()
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()
  const config = defu(runtimeConfig.public.sgxRedirects, appConfig.sgxRedirects)

  const { domainUrl, devRedirect } = config
  const requestUrl = request.href

  const canonicalUrl =
    domainUrl && (!import.meta.dev || devRedirect)
      ? resolveURL(
          // Trailing slash for router hash mode
          withTrailingSlash(domainUrl),
          request.pathname,
          request.search,
          request.hash
        )
      : requestUrl

  if (canonicalUrl != requestUrl && !error.value) {
    return navigateTo(canonicalUrl, { redirectCode: 301, external: true })
  }
})
