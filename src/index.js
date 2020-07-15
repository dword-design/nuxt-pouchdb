import { identity } from '@dword-design/functions'
import getPackageName from 'get-package-name'

export default function (moduleOptions) {
  const options = { ...this.options.pouchdb, ...moduleOptions }
  this.addModule([
    getPackageName(require.resolve('@dword-design/nuxt-auth')),
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
