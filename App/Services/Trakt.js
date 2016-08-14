import api from 'apisauce'
import qs from 'querystring'
import URL from 'url'
import { AsyncStorage } from 'react-native'

import traktConfig from '../../trakt.json'


const LOGIN_URL = URL.parse('pizzatime://login')
const LOGIN_STORAGE_KEY = 'Login/Trakt'


class TraktService {
  constructor() {
    this._api = api.create({
      baseURL: 'https://api.trakt.tv',
      headers: {
        'trakt-api-version': '2',
        'trakt-api-key': traktConfig.clientID,
      }
    })
  }

  async getMovies(type = 'trending', page = 1, limit = 20) {
    const params = qs.stringify({
      extended: 'full,images',
      page,
      limit
    })

    const resp = await this._api.get(`/movies/${type}?${params}`)
    if (!resp.ok) {
      throw new Error(`there was a problem calling api.trakt.tv, error ${resp.status}`)
    }

    return resp.data
  }

  get authorizeUri() {
    return 'https://api.trakt.tv/oauth/authorize?' + qs.stringify({
      response_type: 'code',
      client_id: traktConfig.clientID,
      redirect_uri: LOGIN_URL.href,
      state: '',
    })
  }

  isAppLoginRedirection(url) {
    const {protocol, hostname} = URL.parse(url)
    return protocol == LOGIN_URL.protocol && hostname == LOGIN_URL.hostname
  }

  async appLogin(url) {
    const {query} = URL.parse(url)
    const {code} = qs.parse(query)

    const resp = await this._api.post('/oauth/token', {
      code: code,
      client_id: traktConfig.clientID,
      client_secret: traktConfig.clientSecret,
      redirect_uri: LOGIN_URL.href,
      grant_type: 'authorization_code',
    })

    if (!resp.ok) {
      throw new Error('cannot retrieve token: ' + JSON.stringify(resp))
    }

    await AsyncStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(resp.data))

    return resp.data
  }

  async isLogged() {
    const data = await AsyncStorage.getItem(LOGIN_STORAGE_KEY)
    return data !== null ? JSON.parse(data) : false
  }

  async appLogout() {
    const data = await this.isLogged()
    if (!data) {
      return
    }

    await AsyncStorage.removeItem(LOGIN_STORAGE_KEY)
    await this._api.post('/oauth/revoke', {
      access_token: data.access_token,
    })
  }

  async refreshAuth() {
    const data = await this.isLogged()
    if (!data) {
      return false
    }

    const resp = this._api.post('/oauth/token', {
      refresh_token: data.refresh_token,
      client_id: traktConfig.clientID,
      client_secret: traktConfig.clientSecret,
      redirect_uri: LOGIN_URL.href,
      grant_type: 'refresh_token',
    })
  }
}

export default TraktService