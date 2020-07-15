import { pick, property } from '@dword-design/functions'

export default class {
  constructor(auth, options) {
    this.$auth = auth
    this.url = options.url || 'http://localhost:5984'
  }

  async login(credentials) {
    await this.$auth.reset()
    const user = await this.$auth.request({
      data: credentials,
      method: 'post',
      url: `${this.url}/_session`,
      withCredentials: true,
    })
    this.$auth.setUser(user |> pick('name'))
  }

  async fetchUser() {
    const user =
      this.$auth.request({ method: 'get', url: `${this.url}/_session` })
      |> await
      |> property('userCtx')
    this.$auth.setUser(user.name === null ? undefined : user)
  }

  async logout() {
    await this.$auth.request({
      method: 'delete',
      url: `${this.url}/_session`,
      withCredentials: true,
    })
    await this.$auth.reset()
  }
}
