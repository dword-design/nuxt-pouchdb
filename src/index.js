import { identity } from '@dword-design/functions'
import packageName from 'depcheck-package-name'

export default async function (moduleOptions) {
  const options = { ...this.options.pouchdb, ...moduleOptions }
  await this.addModule([
    packageName`@dword-design/nuxt-auth`,
    {
      redirect: options.redirect,
      strategies: {
        local: false,
        pouchdb: {
          _provider: identity,
          _scheme: require.resolve('./auth-scheme'),
          url: options.url,
        },
      },
    },
  ])
}
