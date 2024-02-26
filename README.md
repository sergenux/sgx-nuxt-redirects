# sgx-nuxt-redirects

Domain URL and trailing slash redirects for Nuxt.

## Setup

1.  Install package:

```bash
npm install sgx-nuxt-redirects
```

2. Add package to `modules` in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-redirects']
})
```

## Configuration

**Type:**

```ts
interface NuxtConfig {
  sgxRedirects?: ModuleOptions
}

interface ModuleOptions {
  // Canonical domain URL with protocol
  // Default: undefined
  domainUrl?: string

  // Domain URL redirect in dev mode
  // Default: false
  devRedirect?: boolean

  // Trailing slash redirect (add/remove)
  // Default: undefined
  trailingSlash?: boolean
}
```

**Usage:**

Enable domain URL redirect for production mode:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-redirects'],
  sgxRedirects: {
    domainUrl: 'https://my-domain.com'
  }
})
```

Enable domain URL redirect also for development mode:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-redirects'],
  sgxRedirects: {
    domainUrl: 'https://my-domain.com',
    devRedirect: true
  }
})
```

Enable redirect with adding trailing slash:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-redirects'],
  sgxRedirects: {
    trailingSlash: true
  }
})
```

Enable redirect with removing trailing slash:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['sgx-nuxt-redirects'],
  sgxRedirects: {
    trailingSlash: false
  }
})
```

## Development

```bash
# Clone repository
git clone https://github.com/sergenux/sgx-nuxt-redirects.git

# Change directory
cd sgx-nuxt-redirects

# Install dependencies
npm install

# Prepare types
npm run dev:prepare

# Develop with playground
npm run dev

# Build playground
npm run dev:build

# Code checks
npm run typecheck
npm run lint
npm run lint:fix
npm run format
npm run format:fix
```
