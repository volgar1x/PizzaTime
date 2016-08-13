import api from 'apisauce'
import qs from 'querystring'

import traktConfig from '../../trakt.json'

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

  getMovies(type = 'trending', page = 1, limit = 20) {
    const params = qs.stringify({
      extended: 'full,images',
      page,
      limit
    })

    return this._api.get(`/movies/${type}?${params}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`there was a problem calling api.trakt.tv, error ${resp.status}`)
      }

      return resp.data
    })
  }

  getMovie(movieId) {
    return this._api.get(`/movies/${movieId}`)
    .then((resp) => {

    })
  }
}

export default TraktService