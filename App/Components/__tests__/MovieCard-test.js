import React from 'react'
import 'react-native'

import MovieCard from '../MovieCard'
import { create as render } from 'react-test-renderer'

test('Movies renders correctly', () => {
  const movie = require('./movie.json')
  const tree = render(
    <MovieCard onPress={() => false} movie={movie}/>
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
