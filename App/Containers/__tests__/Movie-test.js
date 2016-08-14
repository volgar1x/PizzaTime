import React from 'react'
import 'react-native'

import Movie from '../Movie'
import { create as render } from 'react-test-renderer'

jest.mock('react-native-parallax-scroll-view', () => 'ParallaxScrollView');

test('Movies renders correctly', () => {
  const movie = {
    "title": "The Nice Guys",
    "year": 2016,
    "ids": {"trakt": 187173, "slug": "the-nice-guys-2016", "imdb": "tt3799694", "tmdb": 290250},
    "tagline": "Private dicks",
    "overview": "A private eye investigates the apparent suicide of a fading porn star in 1970s Los Angeles and uncovers a conspiracy.",
    "released": "2016-05-20",
    "runtime": 116,
    "trailer": "http://youtube.com/watch?v=Ihb8vCrj2kc",
    "homepage": "http://www.warnerbros.com/nice-guys",
    "rating": 7.28729146221786,
    "votes": 4076,
    "updated_at": "2016-08-14T08:43:12.000Z",
    "language": "en",
    "available_translations": ["en", "es", "de", "el", "ru", "ro", "he", "hu", "fr", "it", "nl", "cs", "pt", "zh", "pl", "da", "uk", "bg", "et", "hr", "lt", "sr", "tr", "ko", "fi", "sv"],
    "genres": ["crime", "mystery", "thriller", "comedy", "action"],
    "certification": "R",
    "images": {
      "fanart": {
        "full": "https://walter.trakt.us/images/movies/000/187/173/fanarts/original/d71a9488aa.jpg",
        "medium": "https://walter.trakt.us/images/movies/000/187/173/fanarts/medium/d71a9488aa.jpg",
        "thumb": "https://walter.trakt.us/images/movies/000/187/173/fanarts/thumb/d71a9488aa.jpg"
      },
      "poster": {
        "full": "https://walter.trakt.us/images/movies/000/187/173/posters/original/2b19d6ec1f.jpg",
        "medium": "https://walter.trakt.us/images/movies/000/187/173/posters/medium/2b19d6ec1f.jpg",
        "thumb": "https://walter.trakt.us/images/movies/000/187/173/posters/thumb/2b19d6ec1f.jpg"
      },
      "logo": {"full": "https://walter.trakt.us/images/movies/000/187/173/logos/original/f2604d66ed.png"},
      "clearart": {"full": "https://walter.trakt.us/images/movies/000/187/173/cleararts/original/8de9cb76c6.png"},
      "banner": {"full": "https://walter.trakt.us/images/movies/000/187/173/banners/original/278e7b5172.jpg"},
      "thumb": {"full": "https://walter.trakt.us/images/movies/000/187/173/thumbs/original/fa2403503d.jpg"}
    }
  }

  const tree = render(
    <Movie {...movie}/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
